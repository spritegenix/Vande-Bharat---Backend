import {
  Controller,
  Get,
  UseGuards,
  UseInterceptors,
  UsePipes,
  Param,
} from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { UserService } from './user.service';
import { GetUser } from '../auth/decorator';
import { ZodResponseInterceptor } from '@app/interceptors/zod';
import {
  GetCredentialRequestParamDto,
  GetCredentialResponseDto,
  GetUserRequestParamDto,
  GetUserResponseDto,
  ValidateHeaderResponseDto,
} from '@app/dtos';
import { ZodParamValidationPipe } from '@app/pipes/zod';

@Controller('/user')
@UseGuards(JwtGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('{/:userId}')
  @UsePipes(new ZodParamValidationPipe(GetUserRequestParamDto))
  @UseInterceptors(new ZodResponseInterceptor(GetUserResponseDto, true))
  async getUser(
    @GetUser() user: ValidateHeaderResponseDto,
    @Param() param: GetUserRequestParamDto,
  ) {
    return await this.userService.getUser(user, param);
  }

  @Get('{/:userId}/credential{/:credentialId}')
  @UsePipes(new ZodParamValidationPipe(GetCredentialRequestParamDto))
  @UseInterceptors(new ZodResponseInterceptor(GetCredentialResponseDto, true))
  async getCredential(
    @GetUser() user: ValidateHeaderResponseDto,
    @Param() param: GetCredentialRequestParamDto,
  ) {
    return await this.userService.getCredential(user, param);
  }
}
