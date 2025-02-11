import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsPhoneNumber,
  ValidateIf,
} from 'class-validator';
export class LoginDto {
  @ValidateIf((o) => !o.phone)
  @IsEmail()
  @IsNotEmpty()
  email?: string;

  @ValidateIf((o) => !o.email)
  @IsPhoneNumber()
  @IsNotEmpty()
  phone?: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
