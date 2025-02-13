import { Injectable } from '@nestjs/common';
import * as Exception from '@nestjs/common/exceptions';
import { RpcException } from '@nestjs/microservices';
import * as PrismaExceptions from '@prisma/client/extension';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class ErrorUtil {
  private static readonly httpExceptions: Record<number, any> = (() => {
    return Object.keys(Exception)
      .filter((key) => key.endsWith('Exception'))
      .reduce(
        (acc, key) => {
          const exception = (Exception as any)[key];
          if (exception && exception.prototype?.getStatus) {
            acc[new exception().getStatus()] = exception;
          }
          return acc;
        },
        {} as Record<number, any>,
      );
  })();

  private static readonly prismaExceptions: Record<string, any> = (() => {
    return Object.keys(PrismaExceptions)
      .filter((key) => key.startsWith('P')) // Filter Prisma error codes
      .reduce(
        (acc, key) => {
          acc[key] = PrismaExceptions[key];
          return acc;
        },
        {} as Record<string, any>,
      );
  })();

  handleError(error: unknown) {
    // Handle Prisma Errors using PrismaExceptions dynamically
    if (error instanceof PrismaClientKnownRequestError) {
      const exceptionData = ErrorUtil.prismaExceptions[error.code];
      if (exceptionData) {
        const ExceptionClass =
          ErrorUtil.httpExceptions[exceptionData.status] ||
          Exception.InternalServerErrorException;
        throw new ExceptionClass(
          `${exceptionData.message}: ${error.meta?.target || 'unknown'}`,
        );
      }
    }

    // Handle Unexpected Errors
    if (!(error instanceof Error)) {
      throw new RpcException(
        new Exception.InternalServerErrorException(
          'An unexpected error occurred',
        ),
      );
    }

    // If the error is already a NestJS HTTP Exception, rethrow it
    if ('getStatus' in error && typeof error.getStatus === 'function') {
      throw new RpcException(error);
    }

    // Default Fallback
    throw new RpcException(
      new Exception.InternalServerErrorException(
        'An unexpected server error occurred',
      ),
    );
  }
}
