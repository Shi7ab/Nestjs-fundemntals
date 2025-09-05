import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from "../user/user.module";
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constant';
import { JwtStrategy } from './jwt.strategy';


@Module({
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy],
  imports:[UserModule,JwtModule.register({
    global:true,
    secret:jwtConstants.secret,
    signOptions:{expiresIn:'30d'}
  })],
  exports:[AuthService]
})
export class AuthModule {}
