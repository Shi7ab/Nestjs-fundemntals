import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';
import { randomBytes } from 'crypto';
import { ConfigService } from '@nestjs/config';
import { MailService } from '../mail/mail.service';
import { ResetPasswordDto } from './dto/reset-password.dto';



@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
    private readonly mailService: MailService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async validateUser(data: LoginDto): Promise<{ accessToken: string }> {
    // find user from user service by email
    const user = await this.userService.findByEmail(data.email);
    if (!user) throw new UnauthorizedException('User not found');
    // compare password
    const isMatch = await bcrypt.compare(data.password, user.password);
    if (!isMatch) throw new UnauthorizedException('Invalid credentials');
    // generate token
    // return token
    // return user without password
    const payload = { sub: user.id, email: user.email };
    const accessToken = await this.jwtService.signAsync(payload);

    // Cache token for 30 days
    await this.cacheManager.set(
      `token_${user.id}`,
      accessToken,
      3600 * 24 * 30, // 30 days in seconds
    );

    return { accessToken };
  }

  async sendResetPasswordLink(email: string) {

    // Check if user with the given email exists
    const user = await this.userService.findByEmail(email);
    if (!user) throw new BadRequestException('No user found with this email');

    // Generate a unique token and save it to the user's record
    user.resetPasswordToken = randomBytes(32).toString('hex');
    await this.userService.updateUser(user.id, user);

    // Send email with the reset password link
    // The link should contain the user ID and the token as query parameters
    const resetPasswordLink = `${this.config.get<string>(
      'CLIENT_DOMAIN',
    )}/reset-password/${user.id}/${user.resetPasswordToken}`;
    
    // Use MailService to send the email
    await this.mailService.sendResetPasswordTemplate(email, resetPasswordLink);

    return {
      message: 'Password reset link sent to your email, please check your inbox',
    };
  }

  async verifyResetPasswordLink(userId: string, token: string) {
    // Find user by ID
    const user = await this.userService.findUserById(userId);
    if (!user) throw new BadRequestException('Invalid link');

    // Check if the token matches
    if (!user.resetPasswordToken || user.resetPasswordToken !== token) {
      throw new BadRequestException('Invalid or expired link');
    }

    return { message: 'Valid link' };
  }

  async resetPassword(dto: ResetPasswordDto) {
    const { userId, resetPasswordToken, newPassword } = dto;

    const user = await this.userService.findUserById(userId);
    if (!user) throw new BadRequestException('Invalid link');

    if (!user.resetPasswordToken || user.resetPasswordToken !== resetPasswordToken) {
      throw new BadRequestException('Invalid or expired link');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    // Remove resetPasswordToken from user object before updating
    delete user.resetPasswordToken;
    await this.userService.updateUser(userId, user);

    return { message: 'Password reset successfully, please log in' };
  }
}
