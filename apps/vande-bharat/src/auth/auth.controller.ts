import {
  Controller,
  Post,
  Body,
  Get,
  UsePipes,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  AddCredentialRequestDto,
  AddCredentialResponseDto,
  LoginRequestDto,
  LoginResponseDto,
  SignupRequestDto,
  SignupResponseDto,
  ValidateTokenResponseDto,
  VerifyOtpRequestDto,
  VerifyOtpResponseDto,
} from '@app/dtos';
import { ZodValidationPipe } from '@app/pipes/zod';
import { ZodResponseInterceptor } from '@app/interceptors/zod';
import { JwtGuard } from './guard';
import { GetUser } from './decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @UsePipes(new ZodValidationPipe(SignupRequestDto))
  @UseInterceptors(new ZodResponseInterceptor(SignupResponseDto, true))
  async signup(@Body() body: SignupRequestDto) {
    return await this.authService.signup(body);
  }

  @Post('verify-otp')
  @UsePipes(new ZodValidationPipe(VerifyOtpRequestDto))
  @UseInterceptors(new ZodResponseInterceptor(VerifyOtpResponseDto, true))
  async verifyOtp(@Body() body: VerifyOtpRequestDto) {
    return await this.authService.verifyOtp(body);
  }

  @Get('login')
  @UsePipes(new ZodValidationPipe(LoginRequestDto))
  @UseInterceptors(new ZodResponseInterceptor(LoginResponseDto, true))
  async login(@Body() body: LoginRequestDto) {
    return await this.authService.login(body);
  }

  @Post('add-credential')
  @UseGuards(JwtGuard)
  @UsePipes(new ZodValidationPipe(AddCredentialRequestDto))
  @UseInterceptors(new ZodResponseInterceptor(AddCredentialResponseDto, true))
  async addCredential(
    @Body() body: AddCredentialRequestDto, // This should only contain phone
    @GetUser() user: ValidateTokenResponseDto, // This gets the JWT data from req.user
  ) {
    console.log('DTO received:', body); // Should only show phone
    console.log('Authenticated user:', user); // Should show the JWT data
    return await this.authService.addCredential(body, user);
  }
}
