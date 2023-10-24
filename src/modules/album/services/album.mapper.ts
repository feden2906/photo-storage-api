import { AlbumEntity } from '../../../database';
import { MediaMapper } from '../../media/services/media.mapper';
import { AlbumResponseDto } from '../models/dtos/response';
import { AlbumWithMediaResponseDto } from '../models/dtos/response/album-with-media.response.dto';

export class AlbumMapper {
  static toResponse(entity: AlbumEntity): AlbumResponseDto {
    return {
      id: entity.id,
      name: entity.name,
      created: entity.created,
      updated: entity.updated,
    };
  }

  static toResponseWithMedia(entity: AlbumEntity): AlbumWithMediaResponseDto {
    const album = AlbumMapper.toResponse(entity);

    const mediaList = entity.media_to_album.map((mediaToAlbum) =>
      MediaMapper.toResponseListItemDto(mediaToAlbum.media),
    );

    return {
      ...album,
      media: mediaList,
    };
  }

  static toManyResponse(entities: AlbumEntity[]): AlbumResponseDto[] {
    return entities.map(this.toResponse);
  }
}
