import { sign, verify } from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { ErrorUtil } from './error.utils';

@Injectable()
export class JwtUtil {
  private readonly JWT_SECRET: string;
  private readonly JWT_EXPIRATION_TIME: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly errorUtil: ErrorUtil,
  ) {
    this.JWT_SECRET = this.configService.get<string>(
      'JWT_SECRET',
      'defaultSecret',
    ); // Added fallback
    this.JWT_EXPIRATION_TIME = this.configService.get<string>(
      'JWT_EXPIRATION_TIME',
      '1h',
    );
  }

  async signToken(
    userId: string,
    email: string,
    name: string,
  ): Promise<string> {
    try {
      const payload = { sub: userId, email, name };
      return sign(payload, this.JWT_SECRET, {
        expiresIn: this.JWT_EXPIRATION_TIME,
      });
    } catch (error) {
      this.errorUtil.handleError(error);
    }
  }

  async verifyToken(token: string) {
    try {
      return verify(token, this.JWT_SECRET);
    } catch (error) {
      this.errorUtil.handleError(error);
    }
  }
}
