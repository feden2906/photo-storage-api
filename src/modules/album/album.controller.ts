import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { CurrentUser } from '../../common/decorators';
import { IUserData } from '../../common/models';
import { MediaId } from '../media/models/constants';
import { AlbumId } from './models/constants';
import {
  AlbumCreateRequestDto,
  AttachMediaToAlbumRequestDto,
  DetachMediaFromAlbumRequestDto,
} from './models/dtos/request';
import { AlbumResponseDto } from './models/dtos/response';
import { AlbumMapper } from './services/album.mapper';
import { AlbumService } from './services/album.service';

@ApiBearerAuth()
@ApiTags('Album')
@Controller({ path: 'album', version: '1' })
export class AlbumController {
  constructor(private albumService: AlbumService) {}

  @ApiOperation({ description: 'Get a list of albums' })
  @Get()
  public async getAlbumList(
    @CurrentUser() user: IUserData,
  ): Promise<AlbumResponseDto[]> {
    const albumList = await this.albumService.getListAlbum(user.userId);
    return AlbumMapper.toManyResponse(albumList);
  }
  @ApiOperation({ description: 'Creating an album' })
  @Post()
  public async createAlbum(
    @CurrentUser() user: IUserData,
    @Body() dto: AlbumCreateRequestDto,
  ): Promise<AlbumResponseDto> {
    const albumEntity = await this.albumService.createAlbum(dto, user.userId);
    return AlbumMapper.toResponse(albumEntity);
  }

  @ApiOperation({
    description: 'Deleting an album',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(`:${AlbumId}`)
  public async deleteAlbum(
    @CurrentUser() user: IUserData,
    @Param(AlbumId, ParseUUIDPipe) albumId: string,
  ): Promise<void> {
    await this.albumService.deleteAlbum(user.userId, albumId);
  }

  @ApiOperation({
    description: 'Attaching media to an album',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Post(`:${AlbumId}/media`)
  public async attachMedia(
    @Param(AlbumId, ParseUUIDPipe) albumId: string,
    @Body() dto: AttachMediaToAlbumRequestDto,
    @CurrentUser() user: IUserData,
  ): Promise<void> {
    await this.albumService.attachMedia(user.userId, albumId, dto);
  }

  @ApiOperation({
    description: 'Detaching media from album',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(`:${AlbumId}/media`)
  public async detachMedia(
    @Param(AlbumId, ParseUUIDPipe) albumId: string,
    @Body() dto: DetachMediaFromAlbumRequestDto,
    @CurrentUser() user: IUserData,
  ): Promise<void> {
    await this.albumService.detachMedia(albumId, user.userId, dto);
  }

  @ApiOperation({
    description: 'Attaching title image to an album',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Post(`${AlbumId}/title_image/:${MediaId}`)
  public async attachTitleImage(
    @Param(AlbumId, ParseUUIDPipe) albumId: string,
    @Param(MediaId, ParseUUIDPipe) mediaId: string,
    @CurrentUser() user: IUserData,
  ) {
    await this.albumService.attachTitleImage(user.userId, albumId, mediaId);
  }

  @ApiOperation({
    description: 'Detaching title image to an album',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Post(`${AlbumId}/title_image`)
  public async detachTitleImage(
    @Param(AlbumId, ParseUUIDPipe) albumId: string,
    @CurrentUser() user: IUserData,
  ) {
    await this.albumService.detachTitleImage(user.userId, albumId);
  }
}
