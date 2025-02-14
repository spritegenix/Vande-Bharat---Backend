import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  InternalServerErrorException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs';
import { ZodSchema, ZodError } from 'zod';

@Injectable()
export class ZodResponseInterceptor<T> implements NestInterceptor<unknown, T> {
  constructor(
    private schema: ZodSchema<T>,
    private debug: boolean = false,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<T> {
    return next.handle().pipe(
      map((data) => {
        try {
          // console.log(data);
          // Use safeParse instead of parse for better error handling
          const result = this.schema.safeParse(data);

          if (!result.success) {
            if (this.debug) {
              console.error(
                'Zod Response Validation Error:',
                JSON.stringify(this.formatErrors(result.error), null, 2),
              );
            }
            throw new InternalServerErrorException({
              message: 'Invalid response format',
              errors: this.formatErrors(result.error),
            });
          }

          return result.data;
        } catch (error) {
          if (error instanceof InternalServerErrorException) {
            throw error;
          }
          throw new InternalServerErrorException('Response validation failed');
        }
      }),
      catchError((error) => {
        if (this.debug) {
          console.error('Response Interceptor Error:', error);
        }
        throw error;
      }),
    );
  }

  private formatErrors(error: ZodError): Record<string, string[]> {
    return error.errors.reduce(
      (acc, curr) => {
        const key = curr.path.join('.') || 'root';
        acc[key] = acc[key] || [];
        acc[key].push(curr.message);
        return acc;
      },
      {} as Record<string, string[]>,
    );
  }
}
