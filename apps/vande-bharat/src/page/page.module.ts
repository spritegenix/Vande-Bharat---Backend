import { Module } from '@nestjs/common';
import { PageController } from './page.controller';
import { PageService } from './page.service';
import { AuthModule } from '../auth/auth.module';
import { ErrorUtil, FileUtil } from '../utils';
import { PrismaService } from '@app/prisma';
import { SlugUtil } from './utils';

@Module({
  imports: [AuthModule],
  controllers: [PageController],
  providers: [PageService, ErrorUtil, PrismaService, SlugUtil, FileUtil],
  exports: [PageService],
})
export class PageModule {}
