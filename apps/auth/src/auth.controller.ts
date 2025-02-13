import { Controller, UseInterceptors, UsePipes } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import {
  LoginRequestDto,
  LoginResponseDto,
  SignupRequestDto,
  SignupResponseDto,
  ValidateTokenRequestDto,
  ValidateTokenResponseDto,
  VerifyOtpRequestDto,
  VerifyOtpResponseDto,
} from '@app/dtos';
import { ZodValidationPipe } from '@app/pipes/zod';
import { ZodResponseInterceptor } from '@app/interceptors/zod';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern({ cmd: 'auth_signup' })
  @UsePipes(new ZodValidationPipe(SignupRequestDto))
  @UseInterceptors(new ZodResponseInterceptor(SignupResponseDto, true))
  async signup(@Payload() dto: SignupRequestDto) {
    return await this.authService.signup(dto);
  }

  @MessagePattern({ cmd: 'auth_verify_otp' })
  @UsePipes(new ZodValidationPipe(VerifyOtpRequestDto))
  @UseInterceptors(new ZodResponseInterceptor(VerifyOtpResponseDto, true))
  async verifyOtp(@Payload() dto: VerifyOtpRequestDto) {
    return await this.authService.verifyOtp(dto);
  }

  @MessagePattern({ cmd: 'auth_login' })
  @UsePipes(new ZodValidationPipe(LoginRequestDto))
  @UseInterceptors(new ZodResponseInterceptor(LoginResponseDto, true))
  async login(@Payload() dto: LoginRequestDto) {
    return await this.authService.login(dto);
  }

  @MessagePattern({ cmd: 'auth_validate_token' })
  @UsePipes(new ZodValidationPipe(ValidateTokenRequestDto))
  @UseInterceptors(new ZodResponseInterceptor(ValidateTokenResponseDto, true))
  async validateToken(@Payload() dto: ValidateTokenRequestDto) {
    return await this.authService.validateToken(dto);
  }
}
