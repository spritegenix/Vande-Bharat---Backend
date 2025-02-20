import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@app/prisma';
import { ErrorUtil } from '../utils';
import {
  GetCredentialRequestParamDto,
  GetUserRequestParamDto,
  ValidateHeaderResponseDto,
} from '@app/dtos';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly errorUtil: ErrorUtil,
  ) {}
  async getUser(
    user: ValidateHeaderResponseDto,
    param: GetUserRequestParamDto,
  ) {
    try {
      const id = param.userId || user.id || user.slug;

      if (!id) {
        throw new NotFoundException('User id not provided');
      }

      let where: Prisma.UserWhereInput;
      let queryOptions: {
        include?: Prisma.UserInclude;
        select?: Prisma.UserSelect;
      };

      if (id == user.id || id == user.slug) {
        where = { OR: [{ id }, { slug: id }], deletedAt: null };
        queryOptions = {
          include: {
            credentials: { where: { deletedAt: null } },
            pages: {
              where: { isDefault: true, deletedAt: null },
            },
            reports: { where: { deletedAt: null } },
          },
        };
      } else {
        where = {
          OR: [{ id }, { slug: id }],
          isHidden: false,
          isBlocked: false,
          deletedAt: null,
        };
        queryOptions = {
          select: {
            id: true,
            slug: true,
            name: true,
            avatar: true,
            isVerified: true,
          },
        };
      }

      const response = await this.prisma.user.findFirst({
        where,
        ...queryOptions,
      });

      if (!response) {
        throw new NotFoundException('User not found');
      }

      return response;
    } catch (error) {
      this.errorUtil.handleError(error);
    }
  }

  async getCredential(
    user: ValidateHeaderResponseDto,
    param: GetCredentialRequestParamDto,
  ) {
    try {
      const userId = param.userId || user.id || user.slug;

      if (!userId) {
        throw new NotFoundException('User id not provided');
      }

      let where: Prisma.CredentialWhereInput;
      let queryOptions: {
        include?: Prisma.CredentialInclude;
        select?: Prisma.CredentialSelect;
      };

      if (userId == user.id || userId == user.slug) {
        where = {
          id: param.credentialId,
          user: { OR: [{ id: userId }, { slug: userId }], deletedAt: null },
          deletedAt: null,
        };
        queryOptions = {
          include: {},
        };
      } else {
        throw new UnauthorizedException('Unauthorised access');
      }

      const create = await this.prisma.credential.findMany({
        where,
        ...queryOptions,
      });

      if (!create) {
        throw new NotFoundException('Credential not found');
      }

      return create;
    } catch (error) {
      this.errorUtil.handleError(error);
    }
  }
}
