import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  Request,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { CurrentUser, SkipAuth } from '../../common/decorators';
import { IUserData } from '../../common/models';
import { ParseMediaFiles } from '../../common/pipes';
import { ImageId } from './models/constants';
import { MediaListQueryDto } from './models/dtos/request';
import { MediaListResponseDto } from './models/dtos/response';
import { MediaMapper } from './services/media.mapper';
import { MediaService } from './services/media.service';

@ApiTags('Image')
@Controller({ path: 'images', version: '1' })
export class MediaController {
  constructor(private imageService: MediaService) {}

  @SkipAuth()
  @ApiOperation({ description: 'Get list of my images' })
  @Get()
  public async getImageList(
    @Query() query: MediaListQueryDto,
  ): Promise<MediaListResponseDto> {
    const result = await this.imageService.getImageList(query);
    return MediaMapper.toResponseListDto(result, query);
  }

  @ApiOperation({ description: 'Upload images and videos' })
  @UseInterceptors(FilesInterceptor('files'))
  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('upload')
  public async uploadMedia(
    @Request() req,
    @UploadedFiles(ParseMediaFiles) files: Array<Express.Multer.File>,
    @CurrentUser() user: IUserData,
  ): Promise<void> {
    await this.imageService.uploadMediaFiles(files, user.userId);
  }

  @ApiBearerAuth()
  @ApiOperation({ description: 'Delete image' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(`:${ImageId}`)
  public async deleteImage(
    @CurrentUser() user: IUserData,
    @Param(ImageId) imageId: string,
  ): Promise<void> {
    await this.imageService.deleteImage(user.userId, imageId);
  }
}