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
  AddCredentialRequestBodyDto,
  AddCredentialResponseDto,
  LoginRequestBodyDto,
  LoginResponseDto,
  SignupRequestBodyDto,
  SignupResponseDto,
  ValidateHeaderResponseDto,
  VerifyOtpRequestBodyDto,
  VerifyOtpResponseDto,
} from '@app/dtos';
import { ZodBodyValidationPipe } from '@app/pipes/zod';
import { ZodResponseInterceptor } from '@app/interceptors/zod';
import { JwtGuard } from './guard';
import { GetUser } from './decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @UsePipes(new ZodBodyValidationPipe(SignupRequestBodyDto))
  @UseInterceptors(new ZodResponseInterceptor(SignupResponseDto, true))
  async signup(@Body() body: SignupRequestBodyDto) {
    return await this.authService.signup(body);
  }

  @Post('verify-otp')
  @UsePipes(new ZodBodyValidationPipe(VerifyOtpRequestBodyDto))
  @UseInterceptors(new ZodResponseInterceptor(VerifyOtpResponseDto, true))
  async verifyOtp(@Body() body: VerifyOtpRequestBodyDto) {
    return await this.authService.verifyOtp(body);
  }

  @Get('login')
  @UsePipes(new ZodBodyValidationPipe(LoginRequestBodyDto))
  @UseInterceptors(new ZodResponseInterceptor(LoginResponseDto, true))
  async login(@Body() body: LoginRequestBodyDto) {
    return await this.authService.login(body);
  }

  @Post('add-credential')
  @UseGuards(JwtGuard)
  @UsePipes(new ZodBodyValidationPipe(AddCredentialRequestBodyDto))
  @UseInterceptors(new ZodResponseInterceptor(AddCredentialResponseDto, true))
  async addCredential(
    @Body() body: AddCredentialRequestBodyDto, // This should only contain phone
    @GetUser() user: ValidateHeaderResponseDto, // This gets the JWT data from req.user
  ) {
    return await this.authService.addCredential(body, user);
  }
}
