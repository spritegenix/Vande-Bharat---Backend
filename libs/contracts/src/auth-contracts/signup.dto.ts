import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsPhoneNumber,
  ValidateIf,
} from 'class-validator';

export class SignupDto {
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
  password: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}
