import { PickType } from '@nestjs/swagger';

import { BaseAlbumResponseDto } from './base-album.response.dto';

export class AlbumResponseDto extends PickType(BaseAlbumResponseDto, [
  'created',
  'updated',
  'id',
  'name',
]) {}
