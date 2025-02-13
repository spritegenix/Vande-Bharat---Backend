import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthModule } from '../auth/auth.module';
import { ErrorUtil } from '../utils';
import { PrismaService } from '@app/prisma';

@Module({
  imports: [AuthModule],
  controllers: [UserController],
  providers: [UserService, ErrorUtil, PrismaService],
  exports: [UserService],
})
export class UserModule {}
