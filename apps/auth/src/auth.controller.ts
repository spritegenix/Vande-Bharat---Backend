import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import {
  LoginDto,
  SignupDto,
  ValidateTokenDto,
  VerifyOtpDto,
} from '@app/contracts';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern({ cmd: 'auth_signup' })
  async signup(@Payload() dto: SignupDto) {
    return await this.authService.signup(dto);
  }

  @MessagePattern({ cmd: 'auth_verify_otp' })
  async verifyOtp(@Payload() dto: VerifyOtpDto) {
    return await this.authService.verifyOtp(dto);
  }

  @MessagePattern({ cmd: 'auth_login' })
  async login(@Payload() dto: LoginDto) {
    return await this.authService.login(dto);
  }

  @MessagePattern({ cmd: 'auth_validate_token' })
  async validateToken(@Payload() dto: ValidateTokenDto) {
    return await this.authService.validateToken(dto);
  }
}
