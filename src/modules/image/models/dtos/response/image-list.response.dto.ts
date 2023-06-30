import { ImageListQueryDto } from '../request';
import { ImageListItemResponseDto } from './image-list-item.response.dto';

export class ImageListResponseDto extends ImageListQueryDto {
  data: ImageListItemResponseDto[];

  total: number;
}
