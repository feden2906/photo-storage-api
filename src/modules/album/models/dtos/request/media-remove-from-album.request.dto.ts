import { PickType } from '@nestjs/swagger';

import { MediaAddToAlbumRequestDto } from './media-add-to-album.request.dto';

export class MediaRemoveFromAlbumRequestDto extends PickType(
  MediaAddToAlbumRequestDto,
  ['mediaIds'],
) {}
