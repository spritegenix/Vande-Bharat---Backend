import {
  ConflictException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
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
  LoginDto,
  SignupDto,
  ValidateTokenDto,
  VerifyOtpDto,
} from '@app/contracts';

@Injectable()
export class AuthService {
  constructor(
    private errorUtil: ErrorUtil,
    private prisma: PrismaService,
    private config: ConfigService,
    private jwtUtil: JwtUtil,
    private otpUtil: OtpUtil,
    private passwordUtil: PasswordUtil,
    private credentialUtil: CredentialUtil,
    private slugUtil: SlugUtil,
  ) {}

  async signup(dto: SignupDto) {
    try {
      return await this.prisma.$transaction(async (tx) => {
        const contactConditions: Prisma.CredentialWhereInput = {
          value: dto.email || dto.phone,
          isVerified: true,
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
          dto.email,
          'EMAIL',
        );
        await this.credentialUtil.cleanupUnverifiedCredentials(
          tx,
          dto.phone,
          'PHONE',
        );

        const hash = await this.passwordUtil.hashPassword(dto.password);

        const user = await tx.user.create({
          data: {
            hash,
            ownedPages: { create: { name: dto.name, isDefault: true } },
          },
        });

        if (dto.email) {
          await this.credentialUtil.createCredential(
            tx,
            user.id,
            dto.email,
            'EMAIL',
          );
        }
        if (dto.phone) {
          await this.credentialUtil.createCredential(
            tx,
            user.id,
            dto.phone,
            'PHONE',
          );
        }

        return {
          message: `Verification code sent to ${dto.email || dto.phone}`,
        };
      });
    } catch (error) {
      this.errorUtil.handleError(error);
    }
  }

  async verifyOtp(dto: VerifyOtpDto) {
    try {
      const credential = await this.otpUtil.verifyOtp(
        dto.email || dto.phone,
        dto.otp,
      );

      if (credential === null) {
        throw new ForbiddenException('Invalid or expired OTP');
      }

      const slug = await this.slugUtil.createUserSlug(
        credential.user.ownedPages[0].name,
        credential.user.id,
      );

      const user = await this.prisma.user.update({
        where: { id: credential.user.id },
        data: {
          credentials: {
            update: {
              where: { id: credential.id },
              data: {
                isVerified: true,
                otp: null, // Clear OTP after verification
                otpExpiresAt: null,
              },
            },
          },
          ownedPages: {
            update: {
              where: { id: credential.user.ownedPages[0].id }, // Ensure proper filtering
              data: { slug }, // Update slug correctly
            },
          },
        },
        include: {
          credentials: {
            where: { isVerified: true, deletedAt: null },
          },
          ownedPages: {
            where: { isDefault: true, deletedAt: null },
          },
        },
      });

      delete user.hash;

      return {
        ...user,
        token: await this.jwtUtil.signToken(
          user.id,
          user.credentials[0].value,
          user.ownedPages[0].name,
        ),
      };
    } catch (error) {
      this.errorUtil.handleError(error);
    }
  }

  async login(dto: LoginDto) {
    try {
      const value = dto.email || dto.phone;
      const existingUser = await this.prisma.user.findFirst({
        where: {
          credentials: {
            some: {
              value,
              isVerified: true,
              deletedAt: null,
            },
          },
        },
        include: {
          credentials: {
            where: { value, isVerified: true, deletedAt: null },
          },
          ownedPages: { where: { isDefault: true, deletedAt: null } },
        },
      });

      if (
        !existingUser ||
        !(await this.passwordUtil.verifyPassword(
          dto.password,
          existingUser.hash,
        ))
      ) {
        throw new ForbiddenException('Invalid credentials');
      }

      delete existingUser.hash;

      return {
        ...existingUser,
        token: await this.jwtUtil.signToken(
          existingUser.id,
          existingUser.credentials[0].value,
          existingUser.ownedPages[0].name,
        ),
      };
    } catch (error) {
      this.errorUtil.handleError(error);
    }
  }

  async validateToken(dto: ValidateTokenDto) {
    try {
      const payload = await this.jwtUtil.verifyToken(dto.token);

      if (!payload || !payload.sub) {
        throw new UnauthorizedException('Invalid token');
      }

      const user = await this.prisma.user.findUnique({
        where: { id: payload.sub as string },
      });
      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      return user; // Return user data if valid
    } catch (error) {
      this.errorUtil.handleError(error);
    }
  }
}
