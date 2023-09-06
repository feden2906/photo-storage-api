import { PickType } from '@nestjs/swagger';

import { BaseImageResponseDto } from './base-image.response.dto';

export class ImageResponseDto extends PickType(BaseImageResponseDto, [
  'id',
  'url',
]) {}
