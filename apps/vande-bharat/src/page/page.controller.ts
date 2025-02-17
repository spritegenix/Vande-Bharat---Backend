import {
  Body,
  Controller,
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
  CreatePageRequestBodyDto,
  CreatePageResponseDto,
  GetMyPagesResponseDto,
  GetPageFollowerRequestParamDto,
  GetPageFollowerResponseDto,
  UpdateFollowStatusRequestBodyDto,
  UpdateFollowStatusRequestParamDto,
  UpdateFollowStatusResponseDto,
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

  @Get('me')
  @UseInterceptors(new ZodResponseInterceptor(GetMyPagesResponseDto))
  async getMyPages(@GetUser() user: ValidateHeaderResponseDto) {
    return await this.pageService.getMyPages(user);
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

  @Put('update/:pageId')
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

  @Get(':pageId/page-followers')
  @UsePipes(new ZodParamValidationPipe(GetPageFollowerRequestParamDto))
  @UseInterceptors(new ZodResponseInterceptor(GetPageFollowerResponseDto))
  async getPageFollowers(
    @GetUser() user: ValidateHeaderResponseDto,
    @Param() param: GetPageFollowerRequestParamDto,
  ) {
    return await this.pageService.getPageFollowers(user, param);
  }

  @Put(':pageId/page-follower/:pageFollowerId')
  @UsePipes(
    new ZodParamValidationPipe(UpdateFollowStatusRequestParamDto),
    new ZodBodyValidationPipe(UpdateFollowStatusRequestBodyDto),
  )
  @UseInterceptors(new ZodResponseInterceptor(UpdateFollowStatusResponseDto))
  async updateFollowStatus(
    @GetUser() user: ValidateHeaderResponseDto,
    @Param() param: UpdateFollowStatusRequestParamDto,
    @Body() body: UpdateFollowStatusRequestBodyDto,
  ) {
    return await this.pageService.updateFollowStatus(user, param, body);
  }
}
