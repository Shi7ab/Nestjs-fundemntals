// post.repository.ts
import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { createpostDto } from './dto/createpost.dto';
import { updatepostDto } from './dto/updatepost.dto';

@Injectable()
export class PostRepository {
  private prisma = new PrismaClient();

  create(data: createpostDto) {
    return this.prisma.post.create({ data });
  }

  findAll() {
    return this.prisma.post.findMany();
  }

  findOne(id: string) {
    return this.prisma.post.findUnique({ where: { id } });
  }

  update(id: string, data: updatepostDto) {
    return this.prisma.post.update({ where: { id }, data });
  }

  delete(id: string) {
    return this.prisma.post.delete({ where: { id } });
  }
}
