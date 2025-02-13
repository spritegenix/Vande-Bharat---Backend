import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '@app/prisma';
import { ErrorUtil } from '../utils';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly errorUtil: ErrorUtil,
  ) {}
  async userMe(user: User) {
    try {
      const userMe = await this.prisma.user.findUnique({
        where: { id: user.id },
        include: {
          ipAddresses: { where: { deletedAt: null } },
          credentials: { where: { deletedAt: null } },
          comments: { where: { deletedAt: null } },
          reactions: { where: { deletedAt: null } },
          ownedGroups: { where: { deletedAt: null } },
          groupMembers: { where: { deletedAt: null } },
          ownedPages: { where: { deletedAt: null } },
          pageFollowers: { where: { deletedAt: null } },
          orders: { where: { deletedAt: null } },
          cartItems: { where: { deletedAt: null } },
          donations: { where: { deletedAt: null } },
          bookmarks: { where: { deletedAt: null } },
          reports: { where: { deletedAt: null } },
          notifications: { where: { deletedAt: null } },
        },
      });

      return userMe;
    } catch (error) {
      this.errorUtil.handleError(error);
    }
  }
}
