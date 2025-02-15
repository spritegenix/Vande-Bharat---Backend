import {
  Controller,
  Get,
  UseGuards,
  UseInterceptors,
  // UsePipes,
} from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { UserService } from './user.service';
import { GetUser } from '../auth/decorator';
import { ZodResponseInterceptor } from '@app/interceptors/zod';
import {
  UserCredentialResponseDto,
  UserMeResponseDto,
  ValidateHeaderResponseDto,
} from '@app/dtos';
// import { ZodBodyValidationPipe } from '@app/pipes/zod';

@Controller('user')
@UseGuards(JwtGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseInterceptors(new ZodResponseInterceptor(UserMeResponseDto, true))
  @Get('me')
  async getMe(@GetUser() user: ValidateHeaderResponseDto) {
    return await this.userService.me(user);
  }

  @UseInterceptors(new ZodResponseInterceptor(UserCredentialResponseDto, true))
  @Get('credentials')
  async getAllCredentials(@GetUser() user: ValidateHeaderResponseDto) {
    return await this.userService.getAllCredentials(user);
  }
}
