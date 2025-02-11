import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AuthModule } from './auth.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const appContext = await NestFactory.create(AuthModule);
  const configService = appContext.get(ConfigService);

  const host = configService.get<string>('AUTH_HOST', '127.0.0.1');
  const port = configService.get<number>('AUTH_PORT', 4000);

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AuthModule,
    { transport: Transport.TCP, options: { host, port } },
  );

  await app.listen();

  console.log(`🚀 Auth Microservice running on ${host}:${port}`);
}
bootstrap();
