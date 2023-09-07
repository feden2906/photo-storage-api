import { MediaListQueryDto } from '../request';
import { MediaListItemResponseDto } from './media-list-item.response.dto';

export class MediaListResponseDto extends MediaListQueryDto {
  data: MediaListItemResponseDto[];

  total: number;
}
