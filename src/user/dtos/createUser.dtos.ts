import { IsString, IsInt, Length, IsEmail } from 'class-validator';

export class createUserData{
    @IsString()
    @Length(3,20)
    username:String;

    @IsString()
    @IsEmail({},{message:'incorrect Email'})
    email:String;

    @IsInt()
    password:String;

    @IsString()
    Country:String;
}