import { PrismaService } from '@app/prisma';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ErrorUtil, FileUtil } from '../utils';
import {
  CreatePageRequestBodyDto,
  UpdatePageRequestBodyDto,
  UpdatePageRequestParamDto,
  ValidateHeaderResponseDto,
} from '@app/dtos';
import { SlugUtil } from './utils';

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
      const pages = await this.prisma.page.findMany({
        where: {
          ownerId: user.id,
          deletedAt: null,
        },
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

      if (!pageExists) throw new UnauthorizedException('Invalid page ID');

      const page = await this.prisma.page.update({
        where: {
          id: pageExists.id,
        },
        data: {
          name: body.name,
          description: body.description,
          pageContactDetails: body.pageContactDetails,
          avatar: avatar,
          banner: banner,
          slug:
            body.name &&
            (await this.slugUtil.createPageSlug(body.name, pageExists.id)),
        },
      });
      return {
        ...page,
        message: 'Page updated successfully',
      };
    } catch (error) {
      this.errorUtil.handleError(error);
    }
  }
}
