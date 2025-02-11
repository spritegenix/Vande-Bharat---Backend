import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { UserService } from './user.service';
import { GetUser } from '../auth/decorator';
import { User } from '@prisma/client';

@Controller('user')
@UseGuards(JwtGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get('me')
  getMe(@GetUser() user: User) {
    return this.userService.userMe(user);
  }
}
