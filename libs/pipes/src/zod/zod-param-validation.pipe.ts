import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { ZodSchema, ZodError } from 'zod';

@Injectable()
export class ZodParamValidationPipe<T> implements PipeTransform<unknown, T> {
  constructor(
    private schema: ZodSchema<T>,
    private debug: boolean = false,
  ) {}

  transform(value: unknown, metadata: ArgumentMetadata): T {
    // console.log(value, metadata);
    // Return early if value is undefined or null and we're not validating body
    if ((value === undefined || value === null) && metadata.type !== 'param') {
      return value as T;
    }

    // Only validate if we're transforming the request body
    if (metadata.type === 'param') {
      try {
        const result = this.schema.safeParse(value);

        if (!result.success) {
          if (this.debug) {
            console.error(
              'Validation Error:',
              JSON.stringify(this.formatErrors(result.error), null, 2),
            );
          }
          throw new BadRequestException({
            message: 'Validation failed',
            errors: this.formatErrors(result.error),
          });
        }

        return result.data;
      } catch (error) {
        if (error instanceof BadRequestException) {
          throw error;
        }
        throw new BadRequestException('Request validation failed');
      }
    }

    // For non-body data, just pass it through
    return value as T;
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
