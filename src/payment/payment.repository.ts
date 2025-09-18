import {Injectable} from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Injectable()
export class PaymentRepository {
    constructor(private readonly prismaservice:PrismaService) {}
  // Implement your data access methods here

  async create(data: CreatePaymentDto) {
    return this.prismaservice.payment.create({ data });
  }
  async findAll() {
    const payments = await this.prismaservice.payment.findMany();
    return payments;
  }
}