 import { Body, Controller, Get, Headers, Post, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { CacheInterceptor } from '@nestjs/cache-manager';


@UseInterceptors(CacheInterceptor)
@Controller('auth')
export class AuthController {
    constructor(private readonly authservice:AuthService){}

    @Post('login')
    async login(@Body() logindto:LoginDto){
        const user = await this.authservice.validateUser(logindto)
        if (!user) {
            return {message: "invalid creditinal" }
        }
          // هنا لاحقاً حنضيف JWT
       return {user , message: 'Login successful' };
    }
    
    @Post('reset-password')
    async sendResetPasswordLink(@Body('email') Body:LoginDto) {
        return this.authservice.sendResetPasswordLink(Body.email);
    }   
}
