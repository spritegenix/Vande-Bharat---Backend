import {
  ConflictException,
  InternalServerErrorException,
  Injectable,
  BadRequestException,
  UnauthorizedException,
  ForbiddenException,
  NotFoundException,
  HttpException,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Prisma } from '@prisma/client';

@Injectable()
export class ErrorUtil {
  handleError(error: any) {
    // Handle Prisma Unique Constraint Violation (Duplicate Entry)
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2002'
    ) {
      throw new ConflictException(
        `Duplicate field error: ${error.meta?.target}`,
      );
    }

    // Handle NestJS Microservice Errors (TCP responses)
    if (error.response) {
      const { statusCode, message } = error.response;

      // If the error is already a NestJS HTTP Exception, rethrow it
      if ('getStatus' in error && typeof error.getStatus === 'function') {
        throw error;
      }
      switch (statusCode) {
        case 400:
          throw new BadRequestException(message);
        case 401:
          throw new UnauthorizedException(message);
        case 403:
          throw new ForbiddenException(message);
        case 404:
          throw new NotFoundException(message);
        case 409:
          throw new ConflictException(message);
        default:
          throw new InternalServerErrorException(
            message || 'Unexpected error occurred',
          );
      }
    }

    if (error?.response) {
      const { statusCode, message } = error.response;
      return new HttpException(message, statusCode);
    }

    // Handle RPC Exception from Microservice
    if (error instanceof RpcException) {
      const errorResponse = error.getError();
      throw new InternalServerErrorException(
        errorResponse || 'An unknown RPC error occurred',
      );
    }

    // Default Fallback
    throw new InternalServerErrorException(
      'An unexpected server error occurred',
    );
  }
}
