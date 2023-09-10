import { PickType } from '@nestjs/swagger';

import { BaseMediaResponseDto } from './base-media.response.dto';

export class MediaListItemResponseDto extends PickType(BaseMediaResponseDto, [
  'id',
  'url',
]) {}
