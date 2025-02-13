import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map } from 'rxjs';
import { ZodSchema, ZodError } from 'zod';

@Injectable()
export class ZodResponseInterceptor<T> implements NestInterceptor {
  constructor(
    private schema: ZodSchema<T>,
    private debug: boolean = false,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler) {
    return next.handle().pipe(
      map((data) => {
        const result = this.schema.parse(data);
        // if (!result.success) {
        //   if (this.debug) {
        //     console.error(
        //       'Zod Response Validation Error:',
        //       JSON.stringify(result.error, null, 2),
        //     );
        //   }
        //   throw new Error(
        //     `Invalid response format: ${this.formatErrors(result.error)}`,
        //   );
        // }
        return result;
      }),
    );
  }

  private formatErrors(error: ZodError): string {
    return error.errors
      .map((e) => `${e.path.join('.')} - ${e.message}`)
      .join(', ');
  }
}
