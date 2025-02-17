import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ErrorUtil, FileUtil } from './utils';
import { PageModule } from './page/page.module';
import { LoggerModule } from '@app/logger';
import { LoggerMiddleware } from './logger/logger.middleware';

@Module({
  imports: [
    LoggerModule,
    UserModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true, // ✅ Makes ConfigService available across the app
    }),
    PageModule,
  ],
  controllers: [AppController],
  providers: [AppService, ErrorUtil, FileUtil],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*'); // Apply LoggerMiddleware to all routes
  }
}
