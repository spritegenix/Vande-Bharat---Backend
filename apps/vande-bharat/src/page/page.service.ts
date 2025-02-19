import { PrismaService } from '@app/prisma';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ErrorUtil, FileUtil } from '../utils';
import {
  CreatePageRequestBodyDto,
  GetPageFollowerRequestParamDto,
  UpdateFollowStatusRequestBodyDto,
  UpdateFollowStatusRequestParamDto,
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
    private slugUtil: SlugUtil,
    private fileUtil: FileUtil,
  ) {}

  async getMyPages(user: ValidateHeaderResponseDto) {
    try {
      const where: Prisma.PageWhereInput = {
        ownerId: user.id,
        deletedAt: null,
      };
      const include: Prisma.PageInclude = {
        categories: { where: { deletedAt: null } },
        tags: { where: { deletedAt: null } },
        addresses: { where: { deletedAt: null } },
        notifications: { where: { deletedAt: null } },
        followers: { where: { deletedAt: null } },
        following: { where: { deletedAt: null } },
        ownedGroups: { where: { deletedAt: null } },
        joinedGroups: { where: { deletedAt: null } },
        posts: { where: { deletedAt: null } },
        comments: { where: { deletedAt: null } },
        reactions: { where: { deletedAt: null } },
        bookmarks: { where: { deletedAt: null } },
        orders: { where: { deletedAt: null } },
        products: { where: { deletedAt: null } },
        cartItems: { where: { deletedAt: null } },
        donated: { where: { deletedAt: null } },
        donors: { where: { deletedAt: null } },
        reports: { where: { deletedAt: null } },
      };
      const pages = await this.prisma.page.findMany({
        where: where,
        include: include,
      });
      return pages;
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
      const pageExists = await this.prisma.page.findFirst({
        where: {
          OR: [
            {
              id: param.pageId,
            },
            {
              slug: param.pageId,
            },
          ],
          ownerId: user.id,
        },
      });

      if (!pageExists) throw new UnauthorizedException('Invalid page ID');

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

  async getPageFollowers(
    user: ValidateHeaderResponseDto,
    param: GetPageFollowerRequestParamDto,
  ) {
    try {
      const pageExists = await this.prisma.page.findFirst({
        where: {
          OR: [
            {
              id: param.pageId,
            },
            {
              slug: param.pageId,
            },
          ],
          ownerId: user.id,
        },
        include: {
          followers: true,
        },
      });

      if (!pageExists) throw new UnauthorizedException('Invalid page ID');

      return pageExists.followers;
    } catch (error) {
      this.errorUtil.handleError(error);
    }
  }

  async updateFollowStatus(
    user: ValidateHeaderResponseDto,
    param: UpdateFollowStatusRequestParamDto,
    body: UpdateFollowStatusRequestBodyDto,
  ) {
    try {
      const pageExists = await this.prisma.page.findFirst({
        where: {
          OR: [
            {
              id: param.pageId,
            },
            {
              slug: param.pageId,
            },
          ],
          ownerId: user.id,
        },
      });
      if (!pageExists) throw new UnauthorizedException('Invalid page ID');

      const followerExists = await this.prisma.pageFollower.findFirst({
        where: {
          followerId: param.followerId,
          followingId: pageExists.id,
        },
      });
      if (!followerExists)
        throw new UnauthorizedException('Invalid follower ID');

      const pageFollower = await this.prisma.pageFollower.update({
        where: {
          id: followerExists.id,
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
}
