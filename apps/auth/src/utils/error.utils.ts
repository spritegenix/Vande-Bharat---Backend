import {
  ConflictException,
  InternalServerErrorException,
  Injectable,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Prisma } from '@prisma/client';

@Injectable()
export class ErrorUtil {
  handleError(error: Error) {
    // Handle Prisma Unique Constraint Violation (Duplicate Entry)
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2002'
    ) {
      throw new RpcException(
        new ConflictException(`Duplicate field error: ${error.meta?.target}`),
      );
    }

    // Handle Prisma Other Errors (like `P2025` for record not found)
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      throw new RpcException(
        new InternalServerErrorException(`Database error: ${error.message}`),
      );
    }

    // Handle Unexpected Errors
    if (!(error instanceof Error)) {
      throw new RpcException(
        new InternalServerErrorException('An unexpected error occurred'),
      );
    }

    // If the error is already a NestJS HTTP Exception, rethrow it
    if ('getStatus' in error && typeof error.getStatus === 'function') {
      throw new RpcException(error);
    }

    // Default Fallback
    throw new RpcException(
      new InternalServerErrorException('An unexpected server error occurred'),
    );
  }
}
