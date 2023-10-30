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
import { AlbumRoleDecorator } from './decorators/album-role.decorator';
import { AlbumId, MemberId } from './models/constants';
import {
  AlbumCreateRequestDto,
  AttachMediaToAlbumRequestDto,
  DetachMediaFromAlbumRequestDto,
} from './models/dtos/request';
import { AddMemberRequestDto } from './models/dtos/request/add-member.request.dto';
import { AlbumResponseDto } from './models/dtos/response';
import { AlbumRoleEnum } from './models/enums';
import { AlbumMapper } from './services/album.mapper';
import { AlbumService } from './services/album.service';

@ApiBearerAuth()
@ApiTags('Album')
@Controller({ path: 'album', version: '1' })
export class AlbumController {
  constructor(private albumService: AlbumService) {}

  @ApiOperation({ description: 'Creating an album' })
  @Post()
  public async createAlbum(
    @CurrentUser() user: IUserData,
    @Body() dto: AlbumCreateRequestDto,
  ): Promise<AlbumResponseDto> {
    const albumEntity = await this.albumService.createAlbum(user.userId, dto);
    return AlbumMapper.toResponse(albumEntity);
  }

  @ApiOperation({ description: 'Get a list of albums' })
  @Get()
  public async getAlbumList(
    @CurrentUser() user: IUserData,
  ): Promise<AlbumResponseDto[]> {
    const albumList = await this.albumService.getListAlbum(user.userId);
    return AlbumMapper.toManyResponse(albumList);
  }
  @AlbumRoleDecorator(AlbumRoleEnum.VIEWER)
  @ApiOperation({ description: 'Get an album' })
  @Get(`:${AlbumId}`)
  public async getAlbumById(
    @Param(AlbumId, ParseUUIDPipe) albumId: string,
    @CurrentUser() user: IUserData,
  ): Promise<AlbumResponseDto> {
    const album = await this.albumService.getAlbumById(user.userId, albumId);
    return AlbumMapper.toResponse(album);
  }

  @AlbumRoleDecorator(AlbumRoleEnum.OWNER)
  @ApiOperation({
    description: 'Deleting an album',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(`:${AlbumId}`)
  public async deleteAlbum(
    @Param(AlbumId, ParseUUIDPipe) albumId: string,
  ): Promise<void> {
    await this.albumService.deleteAlbum(albumId);
  }

  @AlbumRoleDecorator(AlbumRoleEnum.EDITOR)
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

  @AlbumRoleDecorator(AlbumRoleEnum.EDITOR)
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

  @AlbumRoleDecorator(AlbumRoleEnum.OWNER)
  @ApiOperation({
    description: 'Attaching title image to an album',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Post(`:${AlbumId}/title_image/:${MediaId}`)
  public async attachTitleImage(
    @Param(AlbumId, ParseUUIDPipe) albumId: string,
    @Param(MediaId, ParseUUIDPipe) mediaId: string,
    @CurrentUser() user: IUserData,
  ): Promise<void> {
    await this.albumService.attachTitleImage(user.userId, albumId, mediaId);
  }

  @AlbumRoleDecorator(AlbumRoleEnum.OWNER)
  @ApiOperation({
    description: 'Detaching title image to an album',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Post(`:${AlbumId}/title_image`)
  public async detachTitleImage(
    @Param(AlbumId, ParseUUIDPipe) albumId: string,
    @CurrentUser() user: IUserData,
  ): Promise<void> {
    await this.albumService.detachTitleImage(user.userId, albumId);
  }

  @AlbumRoleDecorator(AlbumRoleEnum.OWNER)
  @ApiOperation({
    description: 'Adding member to album',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Post(`:${AlbumId}/member`)
  public async addMember(
    @Param(AlbumId, ParseUUIDPipe) albumId: string,
    @Body() dto: AddMemberRequestDto,
    @CurrentUser() user: IUserData,
  ): Promise<void> {
    await this.albumService.addMember(user.email, albumId, dto);
  }

  @AlbumRoleDecorator(AlbumRoleEnum.OWNER)
  @ApiOperation({
    description: 'Deleting member from album',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(`:${AlbumId}/member/:${MemberId}`)
  public async deleteMember(
    @Param(AlbumId, ParseUUIDPipe) albumId: string,
    @Param(MemberId, ParseUUIDPipe) memberId: string,
    @CurrentUser() user: IUserData,
  ): Promise<void> {
    await this.albumService.detachMember(user.userId, memberId, albumId);
  }
}
