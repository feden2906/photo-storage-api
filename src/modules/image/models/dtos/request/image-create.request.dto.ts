import { PickType } from '@nestjs/swagger';

import { BaseImageRequestDto } from './base-image.request.dto';

export class ImageCreateRequestDto extends PickType(BaseImageRequestDto, [
  'name',
  'description',
  'image',
]) {}
