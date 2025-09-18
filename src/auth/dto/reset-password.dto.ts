export class ResetPasswordDto {
  userId: string;
  resetPasswordToken: string;
  newPassword: string;
}
