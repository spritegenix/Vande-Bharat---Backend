import * as Exception from '@nestjs/common/exceptions';
import { Injectable } from '@nestjs/common';
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

  handleError(error: any) {
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

    // If the error is already a NestJS HTTP Exception, rethrow it
    if ('getStatus' in error && typeof error.getStatus === 'function') {
      throw error;
    }

    // Handle NestJS Microservice Errors (TCP responses)
    if (error?.response) {
      const { statusCode, message } = error.response;
      const ExceptionClass =
        ErrorUtil.httpExceptions[statusCode] ||
        Exception.InternalServerErrorException;
      throw new ExceptionClass(message || 'Unexpected error occurred');
    }

    // Handle RPC Exception from Microservice
    if (error instanceof RpcException) {
      const errorResponse = error.getError();
      throw new Exception.InternalServerErrorException(
        errorResponse || 'An unknown RPC error occurred',
      );
    }

    // Default Fallback
    throw new Exception.InternalServerErrorException(
      'An unexpected server error occurred',
    );
  }
}
