import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '@app/prisma';
import {
  CredentialUtil,
  ErrorUtil,
  JwtUtil,
  OtpUtil,
  PasswordUtil,
  SlugUtil,
} from './utils';

@Module({
  imports: [
    PrismaModule,
    JwtModule.register({}),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    ErrorUtil,
    JwtUtil,
    OtpUtil,
    PasswordUtil,
    CredentialUtil,
    SlugUtil,
  ],
})
export class AuthModule {}
