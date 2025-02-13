import {
  Controller,
  Post,
  Body,
  Get,
  UsePipes,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  LoginRequestDto,
  LoginResponseDto,
  SignupRequestDto,
  SignupResponseDto,
  VerifyOtpRequestDto,
  VerifyOtpResponseDto,
} from '@app/dtos';
import { ZodValidationPipe } from '@app/pipes/zod';
import { ZodResponseInterceptor } from '@app/interceptors/zod';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @UsePipes(new ZodValidationPipe(SignupRequestDto))
  @UseInterceptors(new ZodResponseInterceptor(SignupResponseDto, true))
  async signup(@Body() dto: SignupRequestDto) {
    return await this.authService.signup(dto);
  }

  @Post('verify-otp')
  @UsePipes(new ZodValidationPipe(VerifyOtpRequestDto))
  @UseInterceptors(new ZodResponseInterceptor(VerifyOtpResponseDto, true))
  async verifyOtp(@Body() dto: VerifyOtpRequestDto) {
    return await this.authService.verifyOtp(dto);
  }

  @Get('login')
  @UsePipes(new ZodValidationPipe(LoginRequestDto))
  @UseInterceptors(new ZodResponseInterceptor(LoginResponseDto, true))
  async login(@Body() dto: LoginRequestDto) {
    return await this.authService.login(dto);
  }
}
