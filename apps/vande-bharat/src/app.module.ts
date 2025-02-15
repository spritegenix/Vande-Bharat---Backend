import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ErrorUtil, FileUtil } from './utils';
import { PageModule } from './page/page.module';

@Module({
  imports: [
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
export class AppModule {}
