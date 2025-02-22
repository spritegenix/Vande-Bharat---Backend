import { Module } from '@nestjs/common';
import { PageController } from './page.controller';
import { PageService } from './page.service';
import { AuthModule } from '../auth/auth.module';
import { CursorUtil, ErrorUtil, FileUtil, NotificationUtil } from '../utils';
import { PrismaModule, PrismaService } from '@app/prisma';
import { SlugUtil } from './utils';
import { Logger } from '@app/logger';

@Module({
  imports: [AuthModule, PrismaModule],
  controllers: [PageController],
  providers: [
    PageService,
    ErrorUtil,
    PrismaService,
    SlugUtil,
    FileUtil,
    NotificationUtil,
    Logger,
    CursorUtil,
  ],
  exports: [PageService],
})
export class PageModule {}
