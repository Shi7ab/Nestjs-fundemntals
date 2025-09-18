// email.queue.ts
import { Queue } from "bullmq";
import { Injectable } from "@nestjs/common";


@Injectable()
export class EmailQueue {
  private queue: Queue;

  constructor() {
    this.queue = new Queue("email", {
      connection: {
        host: "127.0.0.1",
        port: 6379, // redis
      },
    });
  }

  async addEmailJob(data: { to: string; subject: string; body: string }) {
    await this.queue.add("sendEmail", data);
  }
}
