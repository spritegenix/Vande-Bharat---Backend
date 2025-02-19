import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { PageService } from './page.service';
import { ZodResponseInterceptor } from '@app/interceptors/zod';
import {
  CreateFollowingRequestParamDto,
  CreatePageRequestBodyDto,
  CreatePageResponseDto,
  CreateFollowingResponseDto,
  DeleteFollowersRequestParamDto,
  DeleteFollowingRequestParamDto,
  DeletePageRequestParamDto,
  DeletePageResponseDto,
  DeleteFollowersResponseDto,
  DeleteFollowingResponseDto,
  GetFollowersRequestParamDto,
  GetFollowingRequestParamDto,
  GetFollowersResponseDto,
  GetPageRequestParamDto,
  GetPageResponseDto,
  UpdateFollowersRequestBodyDto,
  UpdateFollowersRequestParamDto,
  UpdateFollowersResponseDto,
  UpdateFollowingRequestParamDto,
  UpdateFollowingResponseDto,
  UpdatePageRequestBodyDto,
  UpdatePageRequestParamDto,
  UpdatePageResponseDto,
  ValidateHeaderResponseDto,
} from '@app/dtos';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { ZodBodyValidationPipe, ZodParamValidationPipe } from '@app/pipes/zod';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller('page')
@UseGuards(JwtGuard)
export class PageController {
  constructor(private readonly pageService: PageService) {}

  @Get(':pageId')
  @UsePipes(new ZodParamValidationPipe(GetPageRequestParamDto))
  @UseInterceptors(new ZodResponseInterceptor(GetPageResponseDto))
  async getPage(
    @GetUser() user: ValidateHeaderResponseDto,
    @Param() param: GetPageRequestParamDto,
  ) {
    return await this.pageService.getPage(user, param);
  }

  @Post('create')
  @UsePipes(new ZodBodyValidationPipe(CreatePageRequestBodyDto))
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'avatar', maxCount: 1 },
      { name: 'banner', maxCount: 1 },
    ]),
    new ZodResponseInterceptor(CreatePageResponseDto),
  )
  async createPage(
    @GetUser() user: ValidateHeaderResponseDto,
    @Body() body: CreatePageRequestBodyDto,
    @UploadedFiles()
    files: {
      avatar?: Express.Multer.File[];
      banner?: Express.Multer.File[];
    },
  ) {
    return await this.pageService.createPage(user, body, files);
  }

  @Put(':pageId')
  @UsePipes(
    new ZodParamValidationPipe(UpdatePageRequestParamDto),
    new ZodBodyValidationPipe(UpdatePageRequestBodyDto),
  )
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'avatar', maxCount: 1 },
      { name: 'banner', maxCount: 1 },
    ]),
    new ZodResponseInterceptor(UpdatePageResponseDto),
  )
  async updatePage(
    @GetUser() user: ValidateHeaderResponseDto,
    @Param() param: UpdatePageRequestParamDto,
    @Body() body: UpdatePageRequestBodyDto,
    @UploadedFiles()
    files: {
      avatar?: Express.Multer.File[];
      banner?: Express.Multer.File[];
    },
  ) {
    return await this.pageService.updatePage(user, param, body, files);
  }

  @Delete(':pageId')
  @UsePipes(new ZodParamValidationPipe(DeletePageRequestParamDto))
  @UseInterceptors(new ZodResponseInterceptor(DeletePageResponseDto))
  async deletePage(
    @GetUser() user: ValidateHeaderResponseDto,
    @Param() param: DeletePageRequestParamDto,
  ) {
    return await this.pageService.deletePage(user, param);
  }

  @Get(':pageId/follower/:followerId')
  @UsePipes(new ZodParamValidationPipe(GetFollowersRequestParamDto))
  @UseInterceptors(new ZodResponseInterceptor(GetFollowersResponseDto))
  async getFollowers(
    @GetUser() user: ValidateHeaderResponseDto,
    @Param() param: GetFollowersRequestParamDto,
  ) {
    return await this.pageService.getFollowers(user, param);
  }

  @Put(':pageId/follower/:followerId')
  @UsePipes(
    new ZodParamValidationPipe(UpdateFollowersRequestParamDto),
    new ZodBodyValidationPipe(UpdateFollowersRequestBodyDto),
  )
  @UseInterceptors(new ZodResponseInterceptor(UpdateFollowersResponseDto))
  async updateFollower(
    @GetUser() user: ValidateHeaderResponseDto,
    @Param() param: UpdateFollowersRequestParamDto,
    @Body() body: UpdateFollowersRequestBodyDto,
  ) {
    return await this.pageService.updateFollowers(user, param, body);
  }

  @Delete(':pageId/follower/:followerId')
  @UsePipes(new ZodParamValidationPipe(DeleteFollowersRequestParamDto))
  @UseInterceptors(new ZodResponseInterceptor(DeleteFollowersResponseDto))
  async deleteFollower(
    @GetUser() user: ValidateHeaderResponseDto,
    @Param() param: UpdateFollowersRequestParamDto,
  ) {
    return await this.pageService.deleteFollowers(user, param);
  }

  @Get(':pageId/following/:followingId')
  @UsePipes(new ZodParamValidationPipe(GetFollowingRequestParamDto))
  @UseInterceptors(new ZodResponseInterceptor(GetFollowingRequestParamDto))
  async getFollowing(
    @GetUser() user: ValidateHeaderResponseDto,
    @Param() param: GetFollowingRequestParamDto,
  ) {
    return await this.pageService.getFollowing(user, param);
  }

  @Post(':pageId/following/:followingId')
  @UsePipes(new ZodParamValidationPipe(CreateFollowingRequestParamDto))
  @UseInterceptors(new ZodResponseInterceptor(CreateFollowingResponseDto))
  async createFollowing(
    @GetUser() user: ValidateHeaderResponseDto,
    @Param() param: CreateFollowingRequestParamDto,
  ) {
    return await this.pageService.createFollowing(user, param);
  }

  @Put(':pageId/following/:followingId')
  @UsePipes(new ZodParamValidationPipe(UpdateFollowingRequestParamDto))
  @UseInterceptors(new ZodResponseInterceptor(UpdateFollowingResponseDto))
  async updateFollowing(
    @GetUser() user: ValidateHeaderResponseDto,
    @Param() param: UpdateFollowingRequestParamDto,
  ) {
    return await this.pageService.updateFollowing(user, param);
  }

  @Delete(':pageId/following/:followingId')
  @UsePipes(new ZodParamValidationPipe(DeleteFollowingRequestParamDto))
  @UseInterceptors(new ZodResponseInterceptor(DeleteFollowingResponseDto))
  async deleteFollowing(
    @GetUser() user: ValidateHeaderResponseDto,
    @Param() param: UpdateFollowingRequestParamDto,
  ) {
    return await this.pageService.deleteFollowing(user, param);
  }
}
