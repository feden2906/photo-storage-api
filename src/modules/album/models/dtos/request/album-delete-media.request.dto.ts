import { PickType } from '@nestjs/swagger';

import { AlbumUploadMediaRequestDto } from './album-upload-media.request.dto';

export class AlbumDeleteMediaRequestDto extends PickType(
  AlbumUploadMediaRequestDto,
  ['mediaIds'],
) {}
