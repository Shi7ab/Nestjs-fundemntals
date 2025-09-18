// email.worker.ts
import { Worker } from "bullmq";

new Worker(
  "email",
  async job => {
    if (job.name === "sendEmail") {
      console.log(`📧 Sending email to ${job.data.to}...`);
      // هنا بتحط كود الإيميل الحقيقي
    }
  },
  {
    connection: { host: "localhost", port: 6379 },
  },
);
