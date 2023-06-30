import { PickType } from '@nestjs/swagger';

import { BaseImageResponseDto } from './base-image.response.dto';

export class ImageListItemResponseDto extends PickType(BaseImageResponseDto, [
  'id',
  'url',
  'description',
]) {}
