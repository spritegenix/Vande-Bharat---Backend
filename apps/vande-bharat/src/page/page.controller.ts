import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
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
  DeleteFollowerRequestParamDto,
  DeleteFollowingRequestParamDto,
  DeletePageRequestParamDto,
  DeletePageResponseDto,
  DeleteFollowerResponseDto,
  DeleteFollowingResponseDto,
  GetFollowerRequestParamDto,
  GetFollowingRequestParamDto,
  GetFollowerResponseDto,
  GetPageRequestParamDto,
  GetPageResponseDto,
  UpdateFollowerRequestBodyDto,
  UpdateFollowerRequestParamDto,
  UpdateFollowerResponseDto,
  UpdateFollowingRequestParamDto,
  UpdateFollowingResponseDto,
  UpdatePageRequestBodyDto,
  UpdatePageRequestParamDto,
  UpdatePageResponseDto,
  ValidateHeaderResponseDto,
  GetFollowingResponseDto,
  GetFollowerRequestQueryDto,
  GetFollowingRequestQueryDto,
} from '@app/dtos';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import {
  ZodBodyValidationPipe,
  ZodParamValidationPipe,
  ZodQueryValidationPipe,
} from '@app/pipes/zod';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller('/page')
@UseGuards(JwtGuard)
export class PageController {
  constructor(private readonly pageService: PageService) {}

  @Get('{/:pageId}')
  @UsePipes(new ZodParamValidationPipe(GetPageRequestParamDto))
  @UseInterceptors(new ZodResponseInterceptor(GetPageResponseDto))
  async getPage(
    @GetUser() user: ValidateHeaderResponseDto,
    @Param() param: GetPageRequestParamDto,
  ) {
    return await this.pageService.getPage(user, param);
  }

  @Post()
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

  @Patch('{/:pageId}')
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

  @Delete('{/:pageId}')
  @UsePipes(new ZodParamValidationPipe(DeletePageRequestParamDto))
  @UseInterceptors(new ZodResponseInterceptor(DeletePageResponseDto))
  async deletePage(
    @GetUser() user: ValidateHeaderResponseDto,
    @Param() param: DeletePageRequestParamDto,
  ) {
    return await this.pageService.deletePage(user, param);
  }

  @Get('{/:pageId}/follower{/:followerId}')
  @UsePipes(
    new ZodParamValidationPipe(GetFollowerRequestParamDto),
    new ZodQueryValidationPipe(GetFollowerRequestQueryDto),
  )
  @UseInterceptors(new ZodResponseInterceptor(GetFollowerResponseDto))
  async getFollower(
    @GetUser() user: ValidateHeaderResponseDto,
    @Param() param: GetFollowerRequestParamDto,
    @Query() query: GetFollowerRequestQueryDto,
  ) {
    return await this.pageService.getFollower(user, param, query);
  }

  @Patch('{/:pageId}/follower{/:followerId}')
  @UsePipes(
    new ZodParamValidationPipe(UpdateFollowerRequestParamDto),
    new ZodBodyValidationPipe(UpdateFollowerRequestBodyDto),
  )
  @UseInterceptors(new ZodResponseInterceptor(UpdateFollowerResponseDto))
  async updateFollower(
    @GetUser() user: ValidateHeaderResponseDto,
    @Param() param: UpdateFollowerRequestParamDto,
    @Body() body: UpdateFollowerRequestBodyDto,
  ) {
    return await this.pageService.updateFollower(user, param, body);
  }

  @Delete('{/:pageId}/follower{/:followerId}')
  @UsePipes(new ZodParamValidationPipe(DeleteFollowerRequestParamDto))
  @UseInterceptors(new ZodResponseInterceptor(DeleteFollowerResponseDto))
  async deleteFollower(
    @GetUser() user: ValidateHeaderResponseDto,
    @Param() param: UpdateFollowerRequestParamDto,
  ) {
    return await this.pageService.deleteFollower(user, param);
  }

  @Get('{/:pageId}/following{/:followingId}')
  @UsePipes(
    new ZodParamValidationPipe(GetFollowingRequestParamDto),
    new ZodQueryValidationPipe(GetFollowingRequestQueryDto),
  )
  @UseInterceptors(new ZodResponseInterceptor(GetFollowingResponseDto))
  async getFollowing(
    @GetUser() user: ValidateHeaderResponseDto,
    @Param() param: GetFollowingRequestParamDto,
    @Query() query: GetFollowingRequestQueryDto,
  ) {
    return await this.pageService.getFollowing(user, param, query);
  }

  @Post('{/:pageId}/following{/:followingId}')
  @UsePipes(new ZodParamValidationPipe(CreateFollowingRequestParamDto))
  @UseInterceptors(new ZodResponseInterceptor(CreateFollowingResponseDto))
  async createFollowing(
    @GetUser() user: ValidateHeaderResponseDto,
    @Param() param: CreateFollowingRequestParamDto,
  ) {
    return await this.pageService.createFollowing(user, param);
  }

  @Put('{/:pageId}/following{/:followingId}')
  @UsePipes(new ZodParamValidationPipe(UpdateFollowingRequestParamDto))
  @UseInterceptors(new ZodResponseInterceptor(UpdateFollowingResponseDto))
  async updateFollowing(
    @GetUser() user: ValidateHeaderResponseDto,
    @Param() param: UpdateFollowingRequestParamDto,
  ) {
    return await this.pageService.updateFollowing(user, param);
  }

  @Delete('{/:pageId}/following{/:followingId}')
  @UsePipes(new ZodParamValidationPipe(DeleteFollowingRequestParamDto))
  @UseInterceptors(new ZodResponseInterceptor(DeleteFollowingResponseDto))
  async deleteFollowing(
    @GetUser() user: ValidateHeaderResponseDto,
    @Param() param: UpdateFollowingRequestParamDto,
  ) {
    return await this.pageService.deleteFollowing(user, param);
  }
}
