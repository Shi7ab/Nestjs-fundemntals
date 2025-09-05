import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from "../user/user.service";
import { LoginDto } from './dto/login.dto';
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";  // 👈 استخدم * as بدل import default
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';




@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async validateUser(data: LoginDto): Promise<{ accessToken: string }> {
    // get user by email
    const user = await this.userService.findByEmail(data.email);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    // check password with bcrypt
    const isMatch = await bcrypt.compare(data.password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // generate token
    const payload = { sub: user.id, email: user.email };
    const accessToken = await this.jwtService.signAsync(payload);

    // cache token to store token in cache (30 days)
    await this.cacheManager.set(`token_${user.id}`, accessToken, 60 * 60 * 24 * 30);

    // return token only (no password)
    return { accessToken };
  }
 
}
