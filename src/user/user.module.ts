import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserRepository } from "./user.repoistory";
import { PrismaService } from "../../prisma/prisma.service";
import UserController from "./user.controller";

@Module({
  controllers: [UserController],
  providers: [UserService, UserRepository, PrismaService],
  exports: [UserService], // لو داير تستخدمو برا
})
export class UserModule {}
