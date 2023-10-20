import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { CurrentUser } from '../../common/decorators';
import { IUserData } from '../../common/models';
import { mediaId } from '../media/models/constants';
import { AlbumId } from './models/constants';
import {
  AlbumCreateRequestDto,
  AttachMediaToAlbumRequestDto,
  DetachMediaFromAlbumRequestDto,
} from './models/dtos/request';
import { AddMemberRequestDto } from './models/dtos/request/add-member.request.dto';
import { AlbumResponseDto } from './models/dtos/response';
import { AlbumWithMediaResponseDto } from './models/dtos/response/album-with-media.response.dto';
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

  @ApiOperation({ description: 'Get a album with media' })
  @Get(`:${AlbumId}`)
  public async getAlbumById(
    @Param(AlbumId, ParseUUIDPipe) albumId: string,
    @CurrentUser() user: IUserData,
  ): Promise<AlbumWithMediaResponseDto> {
    const album = await this.albumService.getAlbumById(user.userId, albumId);
    return AlbumMapper.toResponseWithMedia(album);
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
    @Param(AlbumId, ParseUUIDPipe) albumId: string,
    @CurrentUser() user: IUserData,
  ): Promise<void> {
    await this.albumService.deleteAlbum(user.userId, albumId);
  }

  @ApiOperation({
    description: 'Adding media to an album',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Post(`:${AlbumId}/media`)
  public async addMedia(
    @Param(AlbumId, ParseUUIDPipe) albumId: string,
    @Body() dto: AttachMediaToAlbumRequestDto,
    @CurrentUser() user: IUserData,
  ): Promise<void> {
    await this.albumService.addMedia(user.userId, albumId, dto);
  }

  @ApiOperation({
    description: 'Removing media from album',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(`:${AlbumId}/media/:${mediaId}`)
  public async detachMedia(
    @Param(AlbumId, ParseUUIDPipe) albumId: string,
    @Body() dto: DetachMediaFromAlbumRequestDto,
    @CurrentUser() user: IUserData,
  ): Promise<void> {
    await this.albumService.detachMedia(albumId, user.userId, dto);
  }

  @ApiOperation({
    description: 'Add member to album',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch(`:${AlbumId}/member`)
  public async addMember(
    @Param(AlbumId, ParseUUIDPipe) albumId: string,
    @Body() dto: AddMemberRequestDto,
    @CurrentUser() user: IUserData,
  ) {
    await this.albumService.addMember(user.userId, albumId, dto);
  }
}
