import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-ioredis-yet';

import { UserModule } from '../src/user/user.module';
import { PostModule } from './post/post.module';
import { AuthModule } from './auth/auth.module';
import { QueueModule } from './queue/queue.module';

import { PrismaService } from '../prisma/prisma.service';
import { UserRepository } from '../src/user/user.repoistory';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PaymentModule } from './payment/payment.module';

@Module({
  imports: [
    UserModule,
    PostModule,
    AuthModule,
    QueueModule,
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: async () => ({
        store: await redisStore({
          connection: {
            host: 'localhost',
            port: 6379,
          },
          ttl: 60,
        }),
      }),
    }),
    PaymentModule,
  ],
  controllers: [AppController],
  providers: [PrismaService, UserRepository, AppService],
  exports: [PrismaService, UserRepository],
})
export class AppModule {}
