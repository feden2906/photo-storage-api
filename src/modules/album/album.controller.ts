import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { CurrentUser } from '../../common/decorators';
import { IUserData } from '../../common/models';
import { AlbumCreateRequestDto } from './models/dtos/request';
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
}
