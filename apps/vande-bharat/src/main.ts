import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as morgan from 'morgan';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  app.use(morgan(configService.get<string>('MORGAN', 'combined'))); //
  app.enableShutdownHooks();

  const host = configService.get<string>('APP_HOST', '127.0.0.1');
  const port = configService.get<number>('APP_PORT', 3000);
  await app.listen(port, host);

  console.log(`🚀 Server running on http://${host}:${port}`);
}
bootstrap();
