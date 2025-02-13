import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { ZodSchema, ZodError } from 'zod';

@Injectable()
export class ZodValidationPipe<T> implements PipeTransform {
  constructor(
    private schema: ZodSchema<T>,
    // Optional debugging flag
  ) {}

  transform(value: unknown): T {
    // Perform validation
    const result = this.schema.safeParse(value);

    if (!result.success) {
      // Extract meaningful error messages
      const formattedErrors = this.formatErrors(result.error);

      // Throw a NestJS-friendly validation exception
      throw new BadRequestException({
        message: 'Validation failed',
        errors: formattedErrors,
      });
    }

    return result.data;
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
