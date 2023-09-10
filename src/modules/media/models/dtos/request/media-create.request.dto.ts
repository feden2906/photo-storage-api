import { PickType } from '@nestjs/swagger';

import { BaseMediaRequestDto } from './base-media.request.dto';

export class MediaCreateRequestDto extends PickType(BaseMediaRequestDto, [
  'name',
  'description',
  'image',
]) {}
