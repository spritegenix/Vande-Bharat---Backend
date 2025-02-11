import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcryptjs';
import { ErrorUtil } from './error.utils';

@Injectable()
export class PasswordUtil {
  private readonly SALT_ROUNDS: number;

  constructor(
    private readonly configService: ConfigService,
    private readonly errorUtil: ErrorUtil,
  ) {
    this.SALT_ROUNDS = parseInt(
      this.configService.get<string>('SALT_ROUNDS', '12'),
      10,
    );
  }

  async hashPassword(password: string) {
    try {
      return await bcrypt.hash(password, this.SALT_ROUNDS);
    } catch (error) {
      this.errorUtil.handleError(error);
    }
  }

  async verifyPassword(password: string, hash: string) {
    try {
      return await bcrypt.compare(password, hash);
    } catch (error) {
      this.errorUtil.handleError(error);
    }
  }
}
