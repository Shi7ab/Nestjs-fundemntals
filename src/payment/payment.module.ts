import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { PrismaService } from 'prisma/prisma.service';
import { PaymentRepository } from './payment.repository';

@Module({
  controllers: [PaymentController],
  providers: [PaymentService,PaymentRepository,PrismaService],
  exports: [PaymentService],
})
export class PaymentModule {}
