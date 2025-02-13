import { Controller, Get, UseGuards, UseInterceptors } from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { UserService } from './user.service';
import { GetUser } from '../auth/decorator';
import { User } from '@prisma/client';
import { ZodResponseInterceptor } from '@app/interceptors/zod';
import { UserMeResponseDto } from '@app/dtos';

@Controller('user')
@UseGuards(JwtGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}
  @UseInterceptors(new ZodResponseInterceptor(UserMeResponseDto, true))
  @Get('me')
  async getMe(@GetUser() user: User) {
    return await this.userService.userMe(user);
  }
}
