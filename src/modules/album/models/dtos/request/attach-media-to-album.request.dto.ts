import { PickType } from '@nestjs/swagger';

import { BaseAlbumRequestDto } from './base-album.request.dto';

export class AttachMediaToAlbumRequestDto extends PickType(
  BaseAlbumRequestDto,
  ['mediaIds'],
) {}
