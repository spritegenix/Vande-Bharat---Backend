import { Injectable, LoggerService } from '@nestjs/common';
import { createLogger, format, transports } from 'winston';

// Using colorize to make the logs more colorful
const { combine, timestamp, printf, colorize } = format;

@Injectable()
export class Logger implements LoggerService {
  private logger = createLogger({
    level: 'info', // Set default log level
    format: combine(
      colorize({ all: true, level: true }), // Enable colorization for both level and message
      timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), // Add a timestamp
      printf(({ timestamp, level, message, context }) => {
        // Beautifying log output by adding some visual structure
        return `\x1b[36m[${timestamp}]\x1b[0m \x1b[1m[\x1b[${this.getLogLevelColor(level)}m${level}\x1b[0m\x1b[1m]\x1b[0m ${context ? `\x1b[32m[${context}]\x1b[0m ` : ''}${message}`;
      }),
    ),
    transports: [
      new transports.Console({
        format: combine(
          colorize({ all: true, level: true }), // Enable colorization for console logs
          printf(({ level, message, context, timestamp }) => {
            // Beautifying the console log with colors for better readability
            return `\x1b[36m[${timestamp}]\x1b[0m \x1b[1m[\x1b[${this.getLogLevelColor(level)}m${level}\x1b[0m\x1b[1m]\x1b[0m ${context ? `\x1b[32m[${context}]\x1b[0m ` : ''}${message}`;
          }),
        ),
      }),
      // Uncomment the following to add file logging
      // new transports.File({
      //   filename: 'logs/app.log',
      //   format: combine(
      //     timestamp(),
      //     printf(({ timestamp, level, message, context }) => {
      //       return `[${timestamp}] [${level}] ${context ? `[${context}]` : ''} ${message}`;
      //     }),
      //   ),
      // }),
    ],
  });

  log(message: string, context?: string) {
    this.logger.info({ message, context });
  }

  error(message: string, trace?: string, context?: string) {
    this.logger.error({ message, trace, context });
  }

  warn(message: string, context?: string) {
    this.logger.warn({ message, context });
  }

  debug(message: string, context?: string) {
    this.logger.debug({ message, context });
  }

  verbose(message: string, context?: string) {
    this.logger.verbose({ message, context });
  }

  // Helper method to assign a color based on log level
  private getLogLevelColor(level: string): string {
    switch (level) {
      case 'info':
        return '32'; // Green
      case 'error':
        return '31'; // Red
      case 'warn':
        return '33'; // Yellow
      case 'debug':
        return '34'; // Blue
      case 'verbose':
        return '35'; // Magenta
      default:
        return '37'; // White
    }
  }
}
