import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@app/prisma';
import { ErrorUtil } from '../utils';
import { ValidateHeaderResponseDto } from '@app/dtos';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly errorUtil: ErrorUtil,
  ) {}
  async me(user: ValidateHeaderResponseDto) {
    try {
      const where: Prisma.UserWhereUniqueInput = { id: user.id };
      const include: Prisma.UserInclude = {
        ipAddresses: { where: { deletedAt: null } },
        credentials: { where: { deletedAt: null } },
        pages: {
          where: { isDefault: true, deletedAt: null },
        },
        reports: { where: { deletedAt: null } },
      };

      const userMe = await this.prisma.user.findUnique({
        where,
        include,
      });

      return userMe;
    } catch (error) {
      this.errorUtil.handleError(error);
    }
  }

  async getAllCredentials(user: ValidateHeaderResponseDto) {
    try {
      const where: Prisma.CredentialWhereInput = {
        userId: user.id,
        deletedAt: null,
      };

      const create = await this.prisma.credential.findMany({
        where,
      });

      return create;
    } catch (error) {
      this.errorUtil.handleError(error);
    }
  }
}
