import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { CursorUtil, ErrorUtil, FileUtil, NotificationUtil } from './utils';
import { PageModule } from './page/page.module';
import { Logger, LoggerModule } from '@app/logger';
import { LoggerMiddleware } from './logger/logger.middleware';
import { NotificationModule } from './notification/notification.module';

@Module({
  imports: [
    LoggerModule,
    UserModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true, // ✅ Makes ConfigService available across the app
    }),
    PageModule,
    NotificationModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    ErrorUtil,
    NotificationUtil,
    FileUtil,
    Logger,
    CursorUtil,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*'); // Apply LoggerMiddleware to all routes
  }
}
