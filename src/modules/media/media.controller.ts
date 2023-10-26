import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';

import { CurrentUser, MediaPaths } from '../../common/decorators';
import { IUserData } from '../../common/models';
import { AlbumRoleDecorator } from '../album/decorators/album-role.decorator';
import { AlbumId } from '../album/models/constants';
import { EAlbumRole } from '../album/models/enums';
import { LocalFilesInterceptor } from '../storage/file.interceptor';
import { MediaId } from './models/constants';
import { MediaListQueryDto } from './models/dtos/request';
import { MediaListResponseDto } from './models/dtos/response';
import { MediaMapper } from './services/media.mapper';
import { MediaService } from './services/media.service';

@ApiBearerAuth()
@ApiTags('Media')
@Controller({ path: 'media', version: '1' })
export class MediaController {
  constructor(private imageService: MediaService) {}

  @ApiOperation({ description: 'Download binary media content' })
  @Get('download')
  public async downloadMedia(
    @Query() query: MediaListQueryDto,
    @Res() res: Response,
    @CurrentUser() user: IUserData,
  ) {
    res.writeHead(200, { 'Content-Type': 'application/octet-stream' });
    const stream = await this.imageService.getMediaStreams(user.userId, query);
    stream.pipe(res);
  }

  @ApiOperation({ description: 'Get list of my media' })
  @Get()
  public async getMediaList(
    @Query()
    query: MediaListQueryDto,
    @CurrentUser() user: IUserData,
  ): Promise<MediaListResponseDto> {
    const result = await this.imageService.getMediaList(user.userId, query);
    return MediaMapper.toResponseListDto(result, query);
  }

  @AlbumRoleDecorator(EAlbumRole.VIEWER)
  @ApiOperation({ description: 'Get list of my media by album id' })
  @Get(`${AlbumId}`)
  public async getMediaListByAlbumId(
    @Param(AlbumId, ParseUUIDPipe) albumId: string,
    @Query() query: MediaListQueryDto,
    @CurrentUser() user: IUserData,
  ): Promise<MediaListResponseDto> {
    const result = await this.imageService.getMediaListByAlbumId(
      user.userId,
      query,
      albumId,
    );
    return MediaMapper.toResponseListDto(result, query);
  }

  @ApiOperation({ description: 'Upload media' })
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

  @ApiOperation({ description: 'Delete media' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(`:${MediaId}`)
  public async deleteMedia(
    @CurrentUser() user: IUserData,
    @Param(MediaId) mediaId: string,
  ): Promise<void> {
    await this.imageService.deleteMedia(user.userId, mediaId);
  }
}
