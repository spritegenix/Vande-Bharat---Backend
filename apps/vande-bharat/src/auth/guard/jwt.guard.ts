import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  Inject,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, firstValueFrom, throwError } from 'rxjs';
import { ErrorUtil } from '../../utils';
import { ValidateTokenResponseDto } from '@app/dtos';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authClient: ClientProxy,
    private readonly errorUtil: ErrorUtil,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = this.getRequest(context);
    const token = this.extractToken(req);

    if (!token) {
      throw new UnauthorizedException('Authentication token is missing');
    }

    try {
      // Call Auth microservice to validate token
      const response = await firstValueFrom(
        this.authClient
          .send({ cmd: 'auth_validate_token' }, { token })
          .pipe(
            catchError((error) =>
              throwError(() => this.errorUtil.handleError(error)),
            ),
          ),
      );

      // ✅ Validate response using Zod before attaching to request
      const parsedResponse = ValidateTokenResponseDto.safeParse(response);
      if (!parsedResponse.success) {
        throw new UnauthorizedException(
          'Invalid authentication response format',
        );
      }

      req.user = parsedResponse.data; // Attach validated user to request
      return true;
    } catch (error) {
      throw this.errorUtil.handleError(error);
    }
  }

  private getRequest(context: ExecutionContext): any {
    return context.switchToHttp().getRequest(); // ✅ Works for HTTP requests
  }

  private extractToken(req: any): string | null {
    const authHeader = req?.headers?.authorization;
    return authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;
  }
}
