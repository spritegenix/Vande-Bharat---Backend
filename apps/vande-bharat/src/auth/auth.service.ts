import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, firstValueFrom, throwError } from 'rxjs';
import { ErrorUtil } from '../utils';
import {
  AddCredentialPayloadDto,
  AddCredentialRequestDto,
  LoginRequestDto,
  SignupPayloadDto,
  SignupRequestDto,
  ValidateHeaderPayloadDto,
  ValidateHeaderResponseDto,
  VerifyOtpRequestDto,
} from '@app/dtos';

@Injectable()
export class AuthService {
  constructor(
    @Inject('AUTH_SERVICE')
    private readonly authClient: ClientProxy,
    private readonly errorUtil: ErrorUtil,
  ) {}

  async signup(body: SignupRequestDto) {
    try {
      return await firstValueFrom(
        this.authClient
          .send({ cmd: 'auth_signup' }, body as SignupPayloadDto)
          .pipe(
            catchError((error) => {
              return throwError(() => error); // Ensure error propagates to the catch block
            }),
          ),
      );
    } catch (error) {
      throw this.errorUtil.handleError(error);
    }
  }

  async verifyOtp(body: VerifyOtpRequestDto) {
    try {
      return await firstValueFrom(
        this.authClient
          .send({ cmd: 'auth_verify_otp' }, body as ValidateHeaderPayloadDto)
          .pipe(
            catchError((error) => {
              return throwError(() => error); // Ensure error propagates to the catch block
            }),
          ),
      );
    } catch (error) {
      throw this.errorUtil.handleError(error);
    }
  }

  async login(body: LoginRequestDto) {
    try {
      return await firstValueFrom(
        this.authClient
          .send({ cmd: 'auth_login' }, body as ValidateHeaderPayloadDto)
          .pipe(
            catchError((error) => {
              return throwError(() => error); // Ensure error propagates to the catch block
            }),
          ),
      );
    } catch (error) {
      throw this.errorUtil.handleError(error);
    }
  }

  async addCredential(
    body: AddCredentialRequestDto,
    user: ValidateHeaderResponseDto,
  ) {
    try {
      return await firstValueFrom(
        this.authClient
          .send({ cmd: 'auth_add_credential' }, {
            ...body,
            ...user,
          } as AddCredentialPayloadDto)
          .pipe(
            catchError((error) => {
              return throwError(() => error); // Ensure error propagates to the catch block
            }),
          ),
      );
    } catch (error) {
      throw this.errorUtil.handleError(error);
    }
  }
}
