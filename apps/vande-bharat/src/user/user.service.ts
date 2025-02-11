import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { ErrorUtil } from '../utils';

@Injectable()
export class UserService {
  constructor(private readonly errorUtil: ErrorUtil) {}
  async userMe(user: User) {
    try {
      return user;
    } catch (error) {
      this.errorUtil.handleError(error);
    }
  }
}
