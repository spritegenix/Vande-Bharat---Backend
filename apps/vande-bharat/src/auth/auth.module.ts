import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { JwtGuard } from './guard';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ErrorUtil } from '../utils';

@Module({
  imports: [
    ConfigModule,
    ClientsModule.registerAsync([
      {
        name: 'AUTH_SERVICE',
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configService.get<string>('AUTH_HOST', '127.0.0.1'),
            port: configService.get<number>('AUTH_PORT', 4000),
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtGuard, ErrorUtil],
  exports: [AuthService, JwtGuard, ClientsModule], // ✅ Export ClientsModule to UserModule
})
export class AuthModule {}
