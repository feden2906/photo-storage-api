import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { CurrentUser } from '../../common/decorators';
import { IUserData } from '../../common/models';
import { AlbumId } from './models/constants';
import {
  AlbumCreateRequestDto,
  AlbumDeleteMediaRequestDto,
  AlbumUploadMediaRequestDto,
} from './models/dtos/request';
import { AlbumResponseDto } from './models/dtos/response';
import { AlbumMapper } from './services/album.mapper';
import { AlbumService } from './services/album.service';

@ApiBearerAuth()
@ApiTags('Album')
@Controller({ path: 'album', version: '1' })
export class AlbumController {
  constructor(private albumService: AlbumService) {}
  @ApiOperation({ description: 'Create album' })
  @Post()
  public async createAlbum(
    @CurrentUser() user: IUserData,
    @Body() dto: AlbumCreateRequestDto,
  ): Promise<AlbumResponseDto> {
    const albumEntity = await this.albumService.createAlbum(dto, user.userId);
    return AlbumMapper.toResponse(albumEntity);
  }

  @ApiOperation({
    description: 'Deleting album',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(`:${AlbumId}`)
  public async deleteAlbum(
    @CurrentUser() user: IUserData,
    @Param(`${AlbumId}`, ParseUUIDPipe) albumId: string,
  ) {
    await this.albumService.deleteAlbum(user.userId, albumId);
  }

  @ApiOperation({
    description: 'Uploading media files to album',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Post(`media/:${AlbumId}`)
  public async uploadMedia(
    @Param(`${AlbumId}`, ParseUUIDPipe) albumId: string,
    @Body() dto: AlbumUploadMediaRequestDto,
    @CurrentUser() user: IUserData,
  ) {
    await this.albumService.uploadMedia(user.userId, albumId, dto);
  }

  @ApiOperation({
    description: 'Deleting media files from album',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(`media/:${AlbumId}`)
  public async deleteMedia(
    @Param(`${AlbumId}`, ParseUUIDPipe) albumId: string,
    @Body() dto: AlbumDeleteMediaRequestDto,
    @CurrentUser() user: IUserData,
  ) {
    await this.albumService.deleteMedia(albumId, user.userId, dto);
  }
}
