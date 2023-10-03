import { PickType } from '@nestjs/swagger';

import { BaseAlbumRequestDto } from './base-album.request.dto';

export class DetachMediaFromAlbumRequestDto extends PickType(
  BaseAlbumRequestDto,
  ['mediaIds'],
) {}
