import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsPhoneNumber,
  ValidateIf,
  Length,
} from 'class-validator';

export class VerifyOtpDto {
  @ValidateIf((o) => !o.phone) // Validate email only if phone is not provided
  @IsEmail()
  @IsNotEmpty()
  email?: string;

  @ValidateIf((o) => !o.email) // Validate phone only if email is not provided
  @IsPhoneNumber()
  @IsNotEmpty()
  phone?: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 6) // Ensure OTP is always 6 digits
  otp: string;
}
