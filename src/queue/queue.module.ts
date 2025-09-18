import { Module } from "@nestjs/common";
import { EmailQueue } from "./email.queue";

@Module({
  providers: [EmailQueue],
  exports: [EmailQueue], // عشان تقدر تستخدمها في services تانية
})
export class QueueModule {}
