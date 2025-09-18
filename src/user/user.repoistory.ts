import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { createUserData } from "./dtos/createUser.dtos";
import { UpdateUserData } from "./dtos/update-user.dto";
import { EmailQueue } from "../queue/email.queue";


@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService,
              private readonly emailQueue: EmailQueue
  ) {}

  async createUser(data: createUserData) {
    return this.prisma.user.create({ data });
  }

  async findUsers() {
    return this.prisma.user.findMany();
  }

  async findUserById(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async findByEmail(email: string) {
     await this.emailQueue.addEmailJob({
      to: email,
      subject: "Welcome to Our Service",
      body: "Thank you for registering!",
    })
  return this.prisma.user.findUnique({
    where: { email },
  });
}


  async updateUser(id: string, data: UpdateUserData) {
    return this.prisma.user.update({ where: { id }, data });
  }

  async deleteUser(id: string) {
    return this.prisma.user.delete({ where: { id } });
  }
 
  async findByResetToken(resetToken: string) {
    return this.prisma.user.findFirst({ 
      where: { resetPasswordToken: resetToken }
    });
  }
}
