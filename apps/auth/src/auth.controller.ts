import { Controller, UseInterceptors, UsePipes } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import {
  AddCredentialPayloadDto,
  AddCredentialResponseDto,
  LoginPayloadDto,
  LoginResponseDto,
  SignupPayloadDto,
  SignupResponseDto,
  ValidateHeaderPayloadDto,
  ValidateHeaderResponseDto,
  VerifyOtpPayloadDto,
  VerifyOtpResponseDto,
} from '@app/dtos';
import { ZodValidationPipe } from '@app/pipes/zod';
import { ZodResponseInterceptor } from '@app/interceptors/zod';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern({ cmd: 'auth_signup' })
  @UsePipes(new ZodValidationPipe(SignupPayloadDto))
  @UseInterceptors(new ZodResponseInterceptor(SignupResponseDto, true))
  async signup(@Payload() payload: SignupPayloadDto) {
    return await this.authService.signup(payload);
  }

  @MessagePattern({ cmd: 'auth_verify_otp' })
  @UsePipes(new ZodValidationPipe(VerifyOtpPayloadDto))
  @UseInterceptors(new ZodResponseInterceptor(VerifyOtpResponseDto, true))
  async verifyOtp(@Payload() payload: VerifyOtpPayloadDto) {
    return await this.authService.verifyOtp(payload);
  }

  @MessagePattern({ cmd: 'auth_login' })
  @UsePipes(new ZodValidationPipe(LoginPayloadDto))
  @UseInterceptors(new ZodResponseInterceptor(LoginResponseDto, true))
  async login(@Payload() payload: LoginPayloadDto) {
    return await this.authService.login(payload);
  }

  @MessagePattern({ cmd: 'auth_validate_header' })
  @UsePipes(new ZodValidationPipe(ValidateHeaderPayloadDto))
  @UseInterceptors(new ZodResponseInterceptor(ValidateHeaderResponseDto, true))
  async validateHeader(@Payload() payload: ValidateHeaderPayloadDto) {
    return await this.authService.validateHeader(payload);
  }

  @MessagePattern({ cmd: 'auth_add_credential' })
  @UsePipes(new ZodValidationPipe(AddCredentialPayloadDto))
  @UseInterceptors(new ZodResponseInterceptor(AddCredentialResponseDto, true))
  async addCredential(
    @Payload()
    payload: AddCredentialPayloadDto,
  ) {
    console.log('add-credential1');
    return await this.authService.addCredential(payload);
  }
}
