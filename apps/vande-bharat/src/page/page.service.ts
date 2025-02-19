import { PrismaService } from '@app/prisma';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ErrorUtil, FileUtil } from '../utils';
import {
  CreateFollowingRequestParamDto,
  CreatePageRequestBodyDto,
  DeleteFollowerRequestParamDto,
  DeleteFollowingRequestParamDto,
  DeletePageRequestParamDto,
  GetFollowerRequestParamDto,
  GetFollowingRequestParamDto,
  GetPageRequestParamDto,
  UpdateFollowerRequestBodyDto,
  UpdateFollowerRequestParamDto,
  UpdateFollowingRequestParamDto,
  UpdatePageRequestBodyDto,
  UpdatePageRequestParamDto,
  ValidateHeaderResponseDto,
} from '@app/dtos';
import { SlugUtil } from './utils';
import * as uuid from 'uuid';
import { Prisma } from '@prisma/client';

@Injectable()
export class PageService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly errorUtil: ErrorUtil,
    private readonly slugUtil: SlugUtil,
    private readonly fileUtil: FileUtil,
  ) {}

  async getPage(
    user: ValidateHeaderResponseDto,
    param: GetPageRequestParamDto,
  ) {
    try {
      const pageExists = await this.pageExists(param.pageId);

      if (!pageExists) throw new NotFoundException('Invalid page ID');

      let where: Prisma.PageWhereInput;
      let queryOptions: {
        include?: Prisma.PageInclude;
        select?: Prisma.PageSelect;
      };

      if (pageExists.ownerId === user.id) {
        where = { id: pageExists.id };
        queryOptions = {
          include: {
            categories: { where: { deletedAt: null } },
            tags: { where: { deletedAt: null } },
            addresses: { where: { deletedAt: null } },
            notifications: { where: { deletedAt: null } },
            follower: { where: { deletedAt: null } },
            following: { where: { deletedAt: null } },
            ownedGroups: { where: { deletedAt: null } },
            joinedGroups: { where: { deletedAt: null } },
            reports: { where: { deletedAt: null } },
          },
        };
      } else {
        where = {
          id: pageExists.id,
          isHidden: false,
          isBlocked: false,
        };
        queryOptions = {
          select: {
            id: true,
            slug: true,
            name: true,
            description: true,
            banner: true,
            avatar: true,
            pageContactDetails: true,
            isVerified: true,
            followerCount: true,
            postCount: true,
          },
        };
      }

      const page = await this.prisma.page.findFirst({
        where,
        ...queryOptions,
      });

      return page;
    } catch (error) {
      this.errorUtil.handleError(error);
    }
  }

  async createPage(
    user: ValidateHeaderResponseDto,
    body: CreatePageRequestBodyDto,
    file: {
      avatar?: Express.Multer.File[];
      banner?: Express.Multer.File[];
    },
  ) {
    try {
      let banner = undefined;

      if (file.banner) {
        banner = await this.fileUtil.uploadToCloudinary(
          file.banner[0],
          'pages/banner',
        );
      }

      let avatar = undefined;

      if (file.avatar) {
        avatar = await this.fileUtil.uploadToCloudinary(
          file.avatar[0],
          'pages/avatars',
        );
      }
      const page = await this.prisma.page.create({
        data: {
          id: uuid.v7(),
          name: body.name,
          description: body.description,
          pageContactDetails: body.pageContactDetails,
          avatar: avatar,
          banner: banner,
          slug: await this.slugUtil.createPageSlug(body.name),
          ownerId: user.id,
        },
      });
      return {
        ...page,
        message: 'Page created successfully',
      };
    } catch (error) {
      this.errorUtil.handleError(error);
    }
  }

  async updatePage(
    user: ValidateHeaderResponseDto,
    param: UpdatePageRequestParamDto,
    body: UpdatePageRequestBodyDto,
    file: {
      avatar?: Express.Multer.File[];
      banner?: Express.Multer.File[];
    },
  ) {
    try {
      const pageExists = await this.pageExists(param.pageId);

      if (!pageExists) throw new NotFoundException('Invalid page ID');

      if (pageExists.ownerId !== user.id)
        throw new UnauthorizedException(
          'You are not authorized to modify this page.',
        );

      let banner = undefined;

      if (file.banner) {
        banner = await this.fileUtil.uploadToCloudinary(
          file.banner[0],
          'pages/banner',
          pageExists.banner,
        );
      }

      let avatar = undefined;

      if (file.avatar) {
        avatar = await this.fileUtil.uploadToCloudinary(
          file.avatar[0],
          'pages/avatars',
          pageExists.avatar,
        );
      }

      let slug = undefined;

      if (body.name !== pageExists.name) {
        slug = await this.slugUtil.createPageSlug(body.name, pageExists.id);
      }

      return await this.prisma.$transaction(async (tx) => {
        const page = await tx.page.update({
          where: {
            id: pageExists.id,
          },
          data: {
            name: body.name,
            description: body.description,
            pageContactDetails: body.pageContactDetails,
            avatar: avatar,
            banner: banner,
            slug: slug,
          },
        });

        if (pageExists.isDefault) {
          await tx.user.update({
            where: {
              id: user.id,
            },
            data: {
              name: body.name,
              avatar: avatar,
              slug: slug,
            },
          });
        }
        return {
          ...page,
          message: 'Page updated successfully',
        };
      });
    } catch (error) {
      this.errorUtil.handleError(error);
    }
  }

  async deletePage(
    user: ValidateHeaderResponseDto,
    param: DeletePageRequestParamDto,
  ) {
    try {
      const pageExists = await this.pageExists(param.pageId);

      if (!pageExists) throw new NotFoundException('Invalid page ID');

      if (pageExists.ownerId !== user.id)
        throw new UnauthorizedException(
          'You are not authorized to modify this page.',
        );

      await this.prisma.page.update({
        where: {
          id: pageExists.id,
        },
        data: {
          deletedAt: new Date(),
        },
      });

      return {
        message: 'Page deleted successfully',
      };
    } catch (error) {
      this.errorUtil.handleError(error);
    }
  }

  async getFollower(
    user: ValidateHeaderResponseDto,
    param: GetFollowerRequestParamDto,
  ) {
    try {
      const pageExists = await this.pageExists(param.pageId);

      if (!pageExists) {
        throw new NotFoundException('Invalid page ID');
      }

      let where: Prisma.PageFollowerWhereInput;
      let queryOptions: {
        include?: Prisma.PageFollowerInclude;
        select?: Prisma.PageFollowerSelect;
      };

      if (pageExists.ownerId === user.id) {
        where = {
          followingId: pageExists.id,
          deletedAt: null,
          followerId: param.followerId,
        };
        queryOptions = {
          include: {
            follower: {
              select: {
                id: true,
                slug: true,
                name: true,
                avatar: true,
              },
            },
          },
        };
      } else {
        where = {
          followingId: pageExists.id,
          status: 'ACCEPTED',
          deletedAt: null,
          followerId: param.followerId,
        };
        queryOptions = {
          select: {
            id: true,
            follower: {
              select: {
                id: true,
                slug: true,
                name: true,
                avatar: true,
              },
            },
          },
        };
      }

      const followers = await this.prisma.pageFollower.findMany({
        where,
        ...queryOptions,
      });

      return followers;
    } catch (error) {
      this.errorUtil.handleError(error);
    }
  }

  async updateFollower(
    user: ValidateHeaderResponseDto,
    param: UpdateFollowerRequestParamDto,
    body: UpdateFollowerRequestBodyDto,
  ) {
    try {
      const pageExists = await this.pageExists(param.pageId);

      if (!pageExists) throw new NotFoundException('Invalid page ID');

      if (pageExists.ownerId !== user.id)
        throw new UnauthorizedException(
          'You are not authorized to modify this page.',
        );

      const pageFollower = await this.prisma.pageFollower.update({
        where: {
          followerId_followingId: {
            followerId: param.followerId,
            followingId: pageExists.id,
          },
        },
        data: {
          status: body.status,
        },
      });

      return { ...pageFollower, message: 'Page follower updated successfully' };
    } catch (error) {
      this.errorUtil.handleError(error);
    }
  }

  async deleteFollower(
    user: ValidateHeaderResponseDto,
    param: DeleteFollowerRequestParamDto,
  ) {
    try {
      const pageExists = await this.pageExists(param.pageId);

      if (!pageExists) throw new NotFoundException('Invalid page ID');

      if (pageExists.ownerId !== user.id)
        throw new UnauthorizedException(
          'You are not authorized to modify this page.',
        );

      await this.prisma.pageFollower.update({
        where: {
          followerId_followingId: {
            followerId: param.followerId,
            followingId: pageExists.id,
          },
        },
        data: {
          deletedAt: new Date(),
        },
      });

      return {
        message: 'Page follower deleted successfully',
      };
    } catch (error) {
      this.errorUtil.handleError(error);
    }
  }

  async getFollowing(
    user: ValidateHeaderResponseDto,
    param: GetFollowingRequestParamDto,
  ) {
    try {
      const pageExists = await this.pageExists(param.pageId);

      if (!pageExists) throw new NotFoundException('Invalid page ID');

      let where: Prisma.PageFollowerWhereInput;
      let queryOptions: {
        include?: Prisma.PageFollowerInclude;
        select?: Prisma.PageFollowerSelect;
      };

      if (pageExists.ownerId === user.id) {
        where = {
          followerId: pageExists.id,
          deletedAt: null,
          followingId: param.followingId,
        };
        queryOptions = {
          include: {
            following: {
              select: {
                id: true,
                slug: true,
                name: true,
                avatar: true,
              },
            },
          },
        };
      } else {
        where = {
          followingId: pageExists.id,
          status: 'ACCEPTED',
          deletedAt: null,
          followerId: param.followingId,
        };
        queryOptions = {
          select: {
            id: true,
            follower: {
              select: {
                id: true,
                slug: true,
                name: true,
                avatar: true,
              },
            },
          },
        };
      }

      return await this.prisma.pageFollower.findFirst({
        where,
        ...queryOptions,
      });
    } catch (error) {
      this.errorUtil.handleError(error);
    }
  }

  async createFollowing(
    user: ValidateHeaderResponseDto,
    param: CreateFollowingRequestParamDto,
  ) {
    try {
      const pageExists = await this.pageExists(param.pageId);

      if (!pageExists) throw new NotFoundException('Invalid page ID');

      if (pageExists.ownerId !== user.id)
        throw new UnauthorizedException(
          'You are not authorized to modify this page.',
        );

      const existing = await this.prisma.pageFollower.findUnique({
        where: {
          followerId_followingId: {
            followerId: pageExists.id,
            followingId: param.followingId,
          },
        },
      });
      if (existing?.status === 'ACCEPTED') {
        throw new BadRequestException('Already following');
      }

      return await this.prisma.pageFollower.upsert({
        where: {
          id: existing?.id,
        },
        update: {
          status: 'PENDING',
        },
        create: {
          followerId: user.id,
          followingId: pageExists.id,
          status: 'PENDING',
        },
      });
    } catch (error) {
      this.errorUtil.handleError(error);
    }
  }

  async updateFollowing(
    user: ValidateHeaderResponseDto,
    param: UpdateFollowingRequestParamDto,
  ) {
    try {
      const pageExists = await this.pageExists(param.pageId);

      if (!pageExists) throw new NotFoundException('Invalid page ID');

      if (pageExists.ownerId !== user.id)
        throw new UnauthorizedException(
          'You are not authorized to modify this page.',
        );

      const existing = await this.prisma.pageFollower.findUnique({
        where: {
          followerId_followingId: {
            followerId: pageExists.id,
            followingId: param.followingId,
          },
        },
      });
      if (existing?.status === 'ACCEPTED') {
        throw new BadRequestException('Already following');
      }
      return await this.prisma.pageFollower.upsert({
        where: {
          id: existing?.id,
        },
        update: {
          status: 'PENDING',
          deletedAt: null,
        },
        create: {
          followerId: user.id,
          followingId: pageExists.id,
          status: 'PENDING',
          deletedAt: null,
        },
      });
    } catch (error) {
      this.errorUtil.handleError(error);
    }
  }

  async deleteFollowing(
    user: ValidateHeaderResponseDto,
    param: DeleteFollowingRequestParamDto,
  ) {
    try {
      const pageExists = await this.pageExists(param.pageId);

      if (!pageExists) throw new NotFoundException('Invalid page ID');

      if (pageExists.ownerId !== user.id)
        throw new UnauthorizedException(
          'You are not authorized to modify this page.',
        );

      await this.prisma.pageFollower.update({
        where: {
          followerId_followingId: {
            followerId: pageExists.id,
            followingId: param.followingId,
          },
        },
        data: {
          deletedAt: new Date(),
        },
      });

      return {
        message: 'Page following deleted successfully',
      };
    } catch (error) {
      this.errorUtil.handleError(error);
    }
  }

  private async pageExists(id: string) {
    try {
      const page = await this.prisma.page.findFirst({
        where: { OR: [{ id }, { slug: id }] },
      });
      if (!page) throw new NotFoundException('Page not found');
      return page;
    } catch (error) {
      this.errorUtil.handleError(error);
    }
  }
}
