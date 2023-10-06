import { PickType } from '@nestjs/swagger';

import { BaseAlbumRequestDto } from './base-album.request.dto';

export class AlbumCreateRequestDto extends PickType(BaseAlbumRequestDto, [
  'name',
]) {}
