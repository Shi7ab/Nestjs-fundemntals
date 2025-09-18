import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserRepository } from "./user.repoistory";
import { PrismaService } from "../../prisma/prisma.service";
import UserController from "./user.controller";
import { QueueModule } from "src/queue/queue.module";

@Module({
  imports: [QueueModule],
  controllers: [UserController],
  providers: [UserService, UserRepository, PrismaService],
  exports: [UserService], // لو داير تستخدمو برا
})
export class UserModule {}
