import {
  Controller,
  Get,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { UserService } from './user.service';
import { GetUser } from '../auth/decorator';
import { ZodResponseInterceptor } from '@app/interceptors/zod';
import { UserMeResponseDto, ValidateTokenResponseDto } from '@app/dtos';
import { ZodValidationPipe } from '@app/pipes/zod';

@Controller('user')
@UseGuards(JwtGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}
  @UsePipes(new ZodValidationPipe(ValidateTokenResponseDto))
  @UseInterceptors(new ZodResponseInterceptor(UserMeResponseDto, true))
  @Get('me')
  async getMe(@GetUser() user: ValidateTokenResponseDto) {
    return await this.userService.me(user);
  }
}
