import { PrismaService } from '@app/prisma';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CursorUtil, ErrorUtil, FileUtil, NotificationUtil } from '../utils';
import {
  CreateFollowingRequestParamDto,
  CreatePageRequestBodyDto,
  DeleteFollowerRequestParamDto,
  DeleteFollowingRequestParamDto,
  DeletePageRequestParamDto,
  GetFollowerRequestParamDto,
  GetFollowerRequestQueryDto,
  GetFollowingRequestParamDto,
  GetFollowingRequestQueryDto,
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
    private readonly notificationUtil: NotificationUtil,
    private readonly cursorUtil: CursorUtil,
  ) {}

  async getPage(
    user: ValidateHeaderResponseDto,
    param: GetPageRequestParamDto,
  ) {
    try {
      const pageId = param.pageId || user.id;
      const pageExists = await this.pageExists(pageId);

      const where: Prisma.PageWhereInput = { id: pageExists.id };
      let queryOptions: {
        include?: Prisma.PageInclude;
        select?: Prisma.PageSelect;
      };

      if (pageExists.ownerId === user.id) {
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
        where.isHidden = false;
        where.isBlocked = false;
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
            privacy: true,
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
      if (!user.id) {
        throw new UnauthorizedException(
          'You are not authorized to create this page.',
        );
      }
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
      const pageId = param.pageId || user.id;
      const pageExists = await this.pageExists(pageId);

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
      const pageId = param.pageId || user.id;
      const pageExists = await this.pageExists(pageId);

      if (pageExists.ownerId !== user.id)
        throw new UnauthorizedException(
          'You are not authorized to modify this page.',
        );

      if (pageExists.isDefault) {
        throw new BadRequestException('Default page cannot be deleted.');
      }

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
    query: GetFollowerRequestQueryDto,
  ) {
    try {
      const pageId = param.pageId || user.id;
      const pageExists = await this.pageExists(pageId);
      const followerExists = param.followerId
        ? await this.pageExists(param.followerId)
        : undefined;

      const where: Prisma.PageFollowerWhereInput = {
        followingId: pageExists.id,
        deletedAt: null,
        followerId: followerExists?.id,
        follower: !followerExists?.id
          ? {
              name: {
                contains: query.search,
                mode: 'insensitive',
              },
              deletedAt: null,
            }
          : undefined,
      };
      let queryOptions: {
        include?: Prisma.PageFollowerInclude;
        select?: Prisma.PageFollowerSelect;
      };

      if (pageExists.ownerId === user.id) {
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
        where.status = 'ACCEPTED';
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

      const {
        cursor,
        limit = 10,
        orderBy = 'createdAt',
        orderDirection = 'desc',
      } = query;

      const cursorObj = this.cursorUtil.buildCursorObject(cursor, orderBy);

      const follower = await this.prisma.pageFollower.findMany({
        where,
        ...queryOptions,
        take: limit,
        skip: cursor ? 1 : 0,
        cursor: cursorObj,
        orderBy: { [orderBy]: orderDirection },
      });

      const nextCursor = this.cursorUtil.getNextCursor(
        follower,
        limit,
        orderBy,
      );

      return { follower, nextCursor };
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
      const pageId = param.pageId || user.id;
      const pageExists = await this.pageExists(pageId);

      if (pageExists.ownerId !== user.id)
        throw new UnauthorizedException(
          'You are not authorized to modify this page.',
        );

      const followerExists = await this.pageExists(param.followerId);

      const pageFollower = await this.prisma.pageFollower.update({
        where: {
          followerId_followingId: {
            followerId: followerExists.id,
            followingId: pageExists.id,
          },
        },
        data: {
          status: body.status,
          statusUpdatedAt: new Date(),
        },
      });

      this.notificationUtil.createOrUpdateNotification(
        pageFollower.id,
        followerExists.id,
        'FOLLOW',
        {
          pageId: pageExists.id,
          pageSlug: pageExists.slug,
          pageName: pageExists.name,
          pageAvatar: pageExists.avatar,
          message:
            pageExists.name +
            ` has ${pageFollower.status.toLocaleLowerCase()}ed your follow request.`,
        },
        null,
      );

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
      const pageId = param.pageId || user.id;
      const pageExists = await this.pageExists(pageId);

      if (pageExists.ownerId !== user.id)
        throw new UnauthorizedException(
          'You are not authorized to modify this page.',
        );

      const followerExists = await this.pageExists(param.followerId);

      const pageFollower = await this.prisma.pageFollower.update({
        where: {
          followerId_followingId: {
            followerId: followerExists.id,
            followingId: pageExists.id,
          },
          deletedAt: null,
        },
        data: {
          deletedAt: new Date(),
          status: 'REJECTED',
          statusUpdatedAt: new Date(),
        },
      });

      this.notificationUtil.deleteNotification(
        pageFollower.id,
        followerExists.id,
      );

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
    query: GetFollowingRequestQueryDto,
  ) {
    try {
      const pageId = param.pageId || user.id;
      const pageExists = await this.pageExists(pageId);
      const followingExists = param.followingId
        ? await this.pageExists(param.followingId)
        : undefined;

      const where: Prisma.PageFollowerWhereInput = {
        followerId: pageExists.id,
        deletedAt: null,
        followingId: followingExists?.id,
        following: !followingExists?.id
          ? {
              name: {
                contains: query.search,
                mode: 'insensitive',
              },
              deletedAt: null,
            }
          : null,
      };
      let queryOptions: {
        include?: Prisma.PageFollowerInclude;
        select?: Prisma.PageFollowerSelect;
      };

      if (pageExists.ownerId === user.id) {
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
        where.status = 'ACCEPTED';
        queryOptions = {
          select: {
            id: true,
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
      }

      const {
        cursor,
        limit = 10,
        orderBy = 'createdAt',
        orderDirection = 'desc',
      } = query;

      const cursorObj = this.cursorUtil.buildCursorObject(cursor, orderBy);

      const following = await this.prisma.pageFollower.findMany({
        where,
        ...queryOptions,
        take: limit,
        skip: cursor ? 1 : 0,
        cursor: cursorObj,
        orderBy: { [orderBy]: orderDirection },
      });

      const nextCursor = this.cursorUtil.getNextCursor(
        following,
        limit,
        orderBy,
      );

      return { following, nextCursor };
    } catch (error) {
      this.errorUtil.handleError(error);
    }
  }

  async createFollowing(
    user: ValidateHeaderResponseDto,
    param: CreateFollowingRequestParamDto,
  ) {
    try {
      const pageId = param.pageId || user.id;
      const pageExists = await this.pageExists(pageId);

      if (pageExists.ownerId !== user.id)
        throw new UnauthorizedException(
          'You are not authorized to modify this page.',
        );

      const followingExists = await this.pageExists(param.followingId);

      if (pageExists.id === followingExists.id) {
        throw new BadRequestException('You cannot follow yourself');
      }

      const existing = await this.prisma.pageFollower.findUnique({
        where: {
          followerId_followingId: {
            followerId: pageExists.id,
            followingId: followingExists.id,
          },
          deletedAt: null,
        },
      });

      if (existing?.status === 'ACCEPTED') {
        throw new BadRequestException('Already following');
      }

      if (
        existing?.status === 'PENDING' &&
        followingExists.privacy === 'PUBLIC'
      ) {
        return existing;
      }

      let pageFollower;
      if (followingExists.privacy === 'PUBLIC') {
        pageFollower = await this.prisma.pageFollower.upsert({
          where: {
            followerId_followingId: {
              followerId: pageExists.id,
              followingId: followingExists.id,
            },
          },
          update: {
            id: uuid.v7(),
            status: 'ACCEPTED',
            deletedAt: null,
            statusUpdatedAt: new Date(),
          },
          create: {
            id: uuid.v7(),
            followerId: pageExists.id,
            followingId: followingExists.id,
            status: 'ACCEPTED',
            deletedAt: null,
            statusUpdatedAt: new Date(),
          },
        });
      } else {
        pageFollower = await this.prisma.pageFollower.upsert({
          where: {
            followerId_followingId: {
              followerId: pageExists.id,
              followingId: followingExists.id,
            },
          },
          update: {
            id: uuid.v7(),
            status: 'PENDING',
            deletedAt: null,
            statusUpdatedAt: null,
          },
          create: {
            id: uuid.v7(),
            followerId: pageExists.id,
            followingId: followingExists.id,
            status: 'PENDING',
            deletedAt: null,
            statusUpdatedAt: null,
          },
        });
      }

      this.notificationUtil.createOrUpdateNotification(
        pageFollower.id,
        followingExists.id,
        'FOLLOW',
        {
          pageId: pageExists.id,
          pageSlug: pageExists.slug,
          pageName: pageExists.name,
          pageAvatar: pageExists.avatar,
          message:
            pageExists.name + pageFollower.statue === 'ACCEPTED'
              ? 'has followed you.'
              : 'has sent you a follow request.',
        },
        null,
      );

      return pageFollower;
    } catch (error) {
      this.errorUtil.handleError(error);
    }
  }

  async updateFollowing(
    user: ValidateHeaderResponseDto,
    param: UpdateFollowingRequestParamDto,
  ) {
    try {
      const pageId = param.pageId || user.id;
      const pageExists = await this.pageExists(pageId);

      if (pageExists.ownerId !== user.id)
        throw new UnauthorizedException(
          'You are not authorized to modify this page.',
        );

      const followingExists = await this.pageExists(param.followingId);

      if (pageExists.id === followingExists.id) {
        throw new BadRequestException('You cannot follow yourself');
      }

      const existing = await this.prisma.pageFollower.findUnique({
        where: {
          followerId_followingId: {
            followerId: pageExists.id,
            followingId: followingExists.id,
          },
          deletedAt: null,
        },
      });

      if (existing?.status === 'ACCEPTED') {
        throw new BadRequestException('Already following');
      }

      if (
        existing?.status === 'PENDING' &&
        followingExists.privacy === 'PUBLIC'
      ) {
        return existing;
      }

      let pageFollower;
      if (followingExists.privacy === 'PUBLIC') {
        pageFollower = await this.prisma.pageFollower.upsert({
          where: {
            followerId_followingId: {
              followerId: pageExists.id,
              followingId: followingExists.id,
            },
          },
          update: {
            id: uuid.v7(),
            status: 'ACCEPTED',
            deletedAt: null,
            statusUpdatedAt: new Date(),
          },
          create: {
            id: uuid.v7(),
            followerId: pageExists.id,
            followingId: followingExists.id,
            status: 'ACCEPTED',
            deletedAt: null,
            statusUpdatedAt: new Date(),
          },
        });
      } else {
        pageFollower = await this.prisma.pageFollower.upsert({
          where: {
            followerId_followingId: {
              followerId: pageExists.id,
              followingId: followingExists.id,
            },
          },
          update: {
            id: uuid.v7(),
            status: 'PENDING',
            deletedAt: null,
            statusUpdatedAt: null,
          },
          create: {
            id: uuid.v7(),
            followerId: pageExists.id,
            followingId: followingExists.id,
            status: 'PENDING',
            deletedAt: null,
            statusUpdatedAt: null,
          },
        });
      }

      this.notificationUtil.createOrUpdateNotification(
        pageFollower.id,
        followingExists.id,
        'FOLLOW',
        {
          pageId: pageExists.id,
          pageSlug: pageExists.slug,
          pageName: pageExists.name,
          pageAvatar: pageExists.avatar,
          message:
            pageExists.name + pageFollower.statue === 'ACCEPTED'
              ? 'has followed you.'
              : 'has sent you a follow request.',
        },
        null,
      );

      return pageFollower;
    } catch (error) {
      this.errorUtil.handleError(error);
    }
  }

  async deleteFollowing(
    user: ValidateHeaderResponseDto,
    param: DeleteFollowingRequestParamDto,
  ) {
    try {
      const pageId = param.pageId || user.id;
      const pageExists = await this.pageExists(pageId);

      if (pageExists.ownerId !== user.id)
        throw new UnauthorizedException(
          'You are not authorized to modify this page.',
        );

      const followingExists = await this.pageExists(param.followingId);

      const pageFollower = await this.prisma.pageFollower.update({
        where: {
          followerId_followingId: {
            followerId: pageExists.id,
            followingId: followingExists.id,
          },
          deletedAt: null,
        },
        data: {
          deletedAt: new Date(),
        },
      });

      this.notificationUtil.deleteNotification(
        pageFollower.id,
        followingExists.id,
      );

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
      if (!page) throw new NotFoundException(`Page ${id} not found`);
      return page;
    } catch (error) {
      this.errorUtil.handleError(error);
    }
  }
}
