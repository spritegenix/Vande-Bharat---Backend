import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  Inject,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authClient: ClientProxy,
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
        this.authClient.send({ cmd: 'auth_validate_token' }, { token }),
      );

      if (response.error) {
        throw new UnauthorizedException(response.error);
      }

      req.user = response; // Attach user to request
      return true;
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

  private getRequest(context: ExecutionContext): any {
    return context.getArgByIndex(0); // ✅ Works for HTTP, RPC, WebSockets
  }

  private extractToken(req: any): string | null {
    if (req?.headers?.authorization?.startsWith('Bearer ')) {
      return req.headers.authorization.split(' ')[1];
    }
    return null;
  }
}
