
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
	async sendResetPasswordTemplate(email: string, resetPasswordLink: string): Promise<void> {
		// Here you would integrate with a real email provider (e.g., nodemailer, SendGrid, etc.)
		// For now, just log the email for demonstration
		console.log(`Sending password reset email to ${email} with link: ${resetPasswordLink}`);
		// TODO: Implement actual email sending logic
	}
}
