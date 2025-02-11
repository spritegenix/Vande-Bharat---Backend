import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, firstValueFrom, throwError } from 'rxjs';
import { LoginDto, SignupDto, VerifyOtpDto } from '@app/contracts';
import { ErrorUtil } from '../utils';

@Injectable()
export class AuthService {
  constructor(
    @Inject('AUTH_SERVICE')
    private readonly authClient: ClientProxy,
    private readonly errorUtil: ErrorUtil,
  ) {}

  async signup(dto: SignupDto) {
    try {
      return await firstValueFrom(
        this.authClient.send({ cmd: 'auth_signup' }, dto).pipe(
          catchError((error) => {
            return throwError(() => error); // Ensure error propagates to the catch block
          }),
        ),
      );
    } catch (error) {
      throw this.errorUtil.handleError(error);
    }
  }

  async verifyOtp(dto: VerifyOtpDto) {
    try {
      return await firstValueFrom(
        this.authClient.send({ cmd: 'auth_verify_otp' }, dto).pipe(
          catchError((error) => {
            return throwError(() => error); // Ensure error propagates to the catch block
          }),
        ),
      );
    } catch (error) {
      throw this.errorUtil.handleError(error);
    }
  }

  async login(dto: LoginDto) {
    try {
      return await firstValueFrom(
        this.authClient.send({ cmd: 'auth_login' }, dto).pipe(
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
