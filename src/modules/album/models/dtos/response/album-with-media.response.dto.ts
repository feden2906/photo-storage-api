import { MediaListItemResponseDto } from '../../../../media/models/dtos/response';
import { BaseAlbumResponseDto } from './base-album.response.dto';

export class AlbumWithMediaResponseDto extends BaseAlbumResponseDto {
  media: MediaListItemResponseDto[];
}
