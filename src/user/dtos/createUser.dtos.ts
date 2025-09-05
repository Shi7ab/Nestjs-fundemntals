import { IsString, Length, IsEmail } from 'class-validator';

export class createUserData {
  @IsString()
  @Length(3, 20)
  username: string;

  @IsEmail({}, { message: 'incorrect Email' })
  email: string;

  @IsString()
  @Length(6, 50, { message: 'Password must be at least 6 characters' })
  password: string;

}
