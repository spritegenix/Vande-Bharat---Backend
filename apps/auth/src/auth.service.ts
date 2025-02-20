import {
  ConflictException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import {
  CredentialUtil,
  ErrorUtil,
  JwtUtil,
  OtpUtil,
  PasswordUtil,
  SlugUtil,
} from './utils';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@app/prisma';
import {
  AddCredentialPayloadDto,
  LoginPayloadDto,
  SignupPayloadDto,
  ValidateHeaderPayloadDto,
  VerifyOtpPayloadDto,
} from '@app/dtos';
import * as uuid from 'uuid';

@Injectable()
export class AuthService {
  constructor(
    private errorUtil: ErrorUtil,
    private prisma: PrismaService,
    private jwtUtil: JwtUtil,
    private otpUtil: OtpUtil,
    private passwordUtil: PasswordUtil,
    private credentialUtil: CredentialUtil,
    private slugUtil: SlugUtil,
  ) {}

  async signup(payload: SignupPayloadDto) {
    try {
      return await this.prisma.$transaction(async (tx) => {
        const contactConditions: Prisma.CredentialWhereInput = {
          value: payload.email || payload.phone,
          isVerified: true,
          verifiedAt: { not: null },
          deletedAt: null,
        };

        const existingUser = await tx.credential.findFirst({
          where: contactConditions,
        });

        if (existingUser) {
          throw new ConflictException('Credentials already in use');
        }

        await this.credentialUtil.cleanupUnverifiedCredentials(
          tx,
          payload.email,
          'EMAIL',
        );
        await this.credentialUtil.cleanupUnverifiedCredentials(
          tx,
          payload.phone,
          'PHONE',
        );

        const id = uuid.v7();

        const hash = await this.passwordUtil.hashPassword(payload.password);

        const user = await tx.user.create({
          data: {
            id: id,
            name: payload.name,
            hash,
            pages: {
              create: { id: id, name: payload.name, isDefault: true },
            },
          },
        });

        if (payload.email) {
          await this.credentialUtil.createCredential(
            tx,
            user.id,
            payload.email,
            'EMAIL',
          );
        }
        if (payload.phone) {
          await this.credentialUtil.createCredential(
            tx,
            user.id,
            payload.phone,
            'PHONE',
          );
        }

        return {
          message: `Verification code sent to ${
            payload.email && payload.phone
              ? `${payload.email} and ${payload.phone}`
              : payload.email
                ? payload.email
                : payload.phone
                  ? payload.phone
                  : 'unknown contact'
          }`,
        };
      });
    } catch (error) {
      this.errorUtil.handleError(error);
    }
  }

  async verifyOtp(payload: VerifyOtpPayloadDto) {
    try {
      const credential = await this.otpUtil.verifyOtp(
        payload.email || payload.phone,
        payload.otp,
      );

      if (credential === null) {
        throw new ForbiddenException('Invalid or expired OTP');
      }

      const slug = await this.slugUtil.createUserSlug(
        credential.user.name,
        credential.user.id,
      );

      const user = await this.prisma.user.update({
        where: { id: credential.user.id },
        data: {
          slug: slug,
          credentials: {
            update: {
              where: { id: credential.id },
              data: {
                isVerified: true,
                verifiedAt: new Date(),
                otp: null, // Clear OTP after verification
                otpExpiresAt: null,
              },
            },
          },
          pages: {
            update: {
              where: { id: credential.user.id }, // Ensure proper filtering
              data: { slug: slug }, // Update slug correctly
            },
          },
        },
        include: {
          credentials: {
            where: {
              id: credential.id,
              deletedAt: null,
            },
          },
          pages: {
            where: { id: credential.user.id, deletedAt: null },
          },
        },
      });

      return {
        ...user,
        token: await this.jwtUtil.signToken(
          user.id,
          user.slug,
          user.credentials[0].value,
          user.pages[0].name,
        ),
      };
    } catch (error) {
      this.errorUtil.handleError(error);
    }
  }

  async login(payload: LoginPayloadDto) {
    try {
      const value = payload.email || payload.phone;
      const existingUser = await this.prisma.user.findFirst({
        where: {
          credentials: {
            some: {
              value,
              isVerified: true,
              verifiedAt: { not: null },
              deletedAt: null,
            },
          },
        },
        include: {
          credentials: {
            where: {
              value,
              isVerified: true,
              verifiedAt: { not: null },
              deletedAt: null,
            },
          },
          pages: { where: { isDefault: true, deletedAt: null } },
        },
      });

      if (
        !existingUser ||
        !(await this.passwordUtil.verifyPassword(
          payload.password,
          existingUser.hash,
        ))
      ) {
        throw new ForbiddenException('Invalid credentials');
      }

      return {
        ...existingUser,
        token: await this.jwtUtil.signToken(
          existingUser.id,
          existingUser.slug,
          existingUser.credentials[0].value,
          existingUser.pages[0].name,
        ),
      };
    } catch (error) {
      this.errorUtil.handleError(error);
    }
  }

  async addCredential(payload: AddCredentialPayloadDto) {
    try {
      return await this.prisma.$transaction(async (tx) => {
        const contactConditions: Prisma.CredentialWhereInput = {
          value: payload.email || payload.phone,
          isVerified: true,
          verifiedAt: { not: null },
          deletedAt: null,
        };

        const existingUser = await tx.credential.findFirst({
          where: contactConditions,
        });

        if (existingUser) {
          throw new ConflictException('Credentials already in use');
        }

        await this.credentialUtil.cleanupUnverifiedCredentials(
          tx,
          payload.email,
          'EMAIL',
        );
        await this.credentialUtil.cleanupUnverifiedCredentials(
          tx,
          payload.phone,
          'PHONE',
        );

        if (payload.email) {
          await this.credentialUtil.createCredential(
            tx,
            payload.id,
            payload.email,
            'EMAIL',
          );
        }
        if (payload.phone) {
          await this.credentialUtil.createCredential(
            tx,
            payload.id,
            payload.phone,
            'PHONE',
          );
        }

        return {
          message: `Verification code sent to ${
            payload.email && payload.phone
              ? `${payload.email} and ${payload.phone}`
              : payload.email
                ? payload.email
                : payload.phone
                  ? payload.phone
                  : 'unknown contact'
          }`,
        };
      });
    } catch (error) {
      this.errorUtil.handleError(error);
    }
  }

  async validateHeader(payload: ValidateHeaderPayloadDto) {
    try {
      const tokenPayload = await this.verifyToken(payload.headers);

      if (!tokenPayload) {
        return {
          id: undefined,
          slug: undefined,
        };
      }

      const user = await this.prisma.user.findUnique({
        where: { id: tokenPayload.sub as string },
      });

      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      return user; // Return user data if valid
    } catch (error) {
      throw this.errorUtil.handleError(error); // Ensure the error is thrown
    }
  }

  private async verifyToken(headers: any) {
    try {
      const authHeader = headers?.authorization;
      if (!authHeader?.startsWith('Bearer ')) {
        return undefined; // Use consistent return type for invalid headers
      }

      const token = authHeader.split(' ')[1];
      return await this.jwtUtil.verifyToken(token);
    } catch {
      throw new UnauthorizedException('JWT verification failed');
    }
  }
}
