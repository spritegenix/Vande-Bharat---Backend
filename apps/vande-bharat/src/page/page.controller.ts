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
  MyPagesResponseDto,
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
  @UseInterceptors(new ZodResponseInterceptor(MyPagesResponseDto))
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
  @UsePipes()
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
}
