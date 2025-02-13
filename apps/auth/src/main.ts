import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AuthModule } from './auth.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AuthModule,
    {
      transport: Transport.TCP,
      options: {
        host: process.env.AUTH_HOST || '127.0.0.1',
        port: parseInt(process.env.AUTH_PORT || '4000', 10),
      },
    },
  );

  await app.listen();
  console.log(
    `🚀 Auth Microservice running on ${process.env.AUTH_HOST || '127.0.0.1'}:${process.env.AUTH_PORT || 4000}`,
  );
}

bootstrap();
