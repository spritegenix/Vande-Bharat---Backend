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
  GetCredentialResponseDto,
  GetUserResponseDto,
  ValidateHeaderResponseDto,
} from '@app/dtos';
// import { ZodBodyValidationPipe } from '@app/pipes/zod';

@Controller('user')
@UseGuards(JwtGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseInterceptors(new ZodResponseInterceptor(GetUserResponseDto, true))
  @Get()
  async getUser(@GetUser() user: ValidateHeaderResponseDto) {
    return await this.userService.getUser(user);
  }

  @UseInterceptors(new ZodResponseInterceptor(GetCredentialResponseDto, true))
  @Get('credentials')
  async getCredentials(@GetUser() user: ValidateHeaderResponseDto) {
    return await this.userService.getCredentials(user);
  }
}
