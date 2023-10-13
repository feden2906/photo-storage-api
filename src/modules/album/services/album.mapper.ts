import { AlbumEntity } from '../../../database';
import { MediaMapper } from '../../media/services/media.mapper';
import { AlbumResponseDto } from '../models/dtos/response';

export class AlbumMapper {
  static toResponse(entity: AlbumEntity): AlbumResponseDto {
    return {
      id: entity.id,
      name: entity.name,
      album_owner: entity.album_owner,
      title_image: entity.title_image
        ? MediaMapper.toResponseListItemDto(entity.title_image)
        : null,
      created: entity.created,
      updated: entity.updated,
    };
  }

  static toManyResponse(entities: AlbumEntity[]): AlbumResponseDto[] {
    return entities.map(this.toResponse);
  }
}
