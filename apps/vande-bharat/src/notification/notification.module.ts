import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { ErrorUtil } from '../utils';
import { PrismaService } from '@app/prisma';

@Module({
  imports: [],
  providers: [NotificationService, ErrorUtil, PrismaService],
  controllers: [NotificationController],
  exports: [NotificationService],
})
export class NotificationModule {}
