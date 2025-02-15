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
        comments: { where: { deletedAt: null } },
        reactions: { where: { deletedAt: null } },
        ownedGroups: { where: { deletedAt: null } },
        joinedGroups: { where: { deletedAt: null } },
        ownedPages: { where: { deletedAt: null } },
        followingPages: { where: { deletedAt: null } },
        orders: { where: { deletedAt: null } },
        cartItems: { where: { deletedAt: null } },
        donations: { where: { deletedAt: null } },
        bookmarks: { where: { deletedAt: null } },
        reports: { where: { deletedAt: null } },
        notifications: { where: { deletedAt: null } },
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
