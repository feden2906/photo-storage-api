import { Body, Controller, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { CurrentUser } from '../../common/decorators';
import { IUserData } from '../../common/models';
import { AlbumCreateRequestDto } from './models/dtos/request';
import { AlbumUploadRequestDto } from './models/dtos/request/album-upload.request.dto';
import { AlbumResponseDto } from './models/dtos/response/album.response.dto';
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
    description: 'Upload media files to album',
  })
  @Post(':albumId')
  public async uploadMedia(
    @Param('albumId', ParseUUIDPipe) albumId: string,
    @Body() dto: AlbumUploadRequestDto,
    @CurrentUser() user: IUserData,
  ) {
    await this.albumService.uploadMedia(albumId, user.userId, dto);
  }
}
