import { PickType } from '@nestjs/swagger';

import { MediaListResponseDto } from '../../../../media/models/dtos/response';
import { BaseAlbumResponseDto } from './base-album.response.dto';

export class AlbumWithMediaResponseDto extends PickType(BaseAlbumResponseDto, [
  'created',
  'updated',
  'name',
  'id',
]) {
  media: MediaListResponseDto;
}
