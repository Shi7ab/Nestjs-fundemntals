import { Module } from "@nestjs/common";
import { UserModule } from "../src/user/user.module";
import { PostModule } from "./post/post.module";
import { PrismaService } from "../prisma/prisma.service";
import { UserRepository } from "./user/user.repoistory";
import { AuthModule } from './auth/auth.module';
import { CacheModule } from "@nestjs/cache-manager";
import { redisStore } from "cache-manager-ioredis-yet";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
  imports: [
    UserModule,
    PostModule,
    AuthModule,
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: async () => ({
        store: redisStore,
        host: 'localhost',
        port: 6379,
        ttl: 60,
      }),
    }),
  ],
  controllers: [AppController],
  providers: [PrismaService, UserRepository, AppService],
  exports: [PrismaService, UserRepository],
})
export class AppModule {}
