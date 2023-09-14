import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import { CurrentUser, MediaPaths, SkipAuth } from '../../common/decorators';
import { IUserData } from '../../common/models';
import { LocalFilesInterceptor } from '../storage/file.interceptor';
import { ImageId } from './models/constants';
import { MediaListQueryDto } from './models/dtos/request';
import { MediaListResponseDto } from './models/dtos/response';
import { MediaMapper } from './services/media.mapper';
import { MediaService } from './services/media.service';

@SkipAuth()
@ApiTags('Media')
@Controller({ path: 'media', version: '1' })
export class MediaController {
  constructor(private imageService: MediaService) {}

  @ApiOperation({ description: 'Download binary media content' })
  @Get('download')
  public async downloadMedia(
    @Query() query: MediaListQueryDto,
    @Res() res: Response,
  ) {
    res.writeHead(200, { 'Content-Type': 'application/octet-stream' });
    const stream = await this.imageService.getMediaStreams(query);
    stream.pipe(res);
  }

  @ApiOperation({ description: 'Get list of my videos and images' })
  @Get()
  public async getMediaList(
    @Query() query: MediaListQueryDto,
  ): Promise<MediaListResponseDto> {
    const result = await this.imageService.getMediaList(query);
    return MediaMapper.toResponseListDto(result, query);
  }

  @ApiOperation({ description: 'Upload images and videos' })
  @ApiBody({
    schema: {
      type: 'object',
      required: ['files'],
      properties: {
        ['files']: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    },
  })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(LocalFilesInterceptor)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('upload')
  public async uploadMedia(
    @MediaPaths() mediaPaths: string[],
    @CurrentUser() user: IUserData,
  ): Promise<void> {
    await this.imageService.uploadMediaFiles(mediaPaths, user.userId);
  }

  @ApiOperation({ description: 'Delete video or image' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(`:${ImageId}`)
  public async deleteImage(
    @CurrentUser() user: IUserData,
    @Param(ImageId) imageId: string,
  ): Promise<void> {
    await this.imageService.deleteMedia(user.userId, imageId);
  }
}
