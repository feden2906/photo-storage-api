import { AlbumEntity } from '../../../database';
import { AlbumResponseDto } from '../models/dtos/response';

export class AlbumMapper {
  static toResponse(entity: AlbumEntity): AlbumResponseDto {
    return {
      id: entity.id,
      name: entity.name,
      created: entity.created,
      updated: entity.updated,
    };
  }

  static toManyResponse(entities: AlbumEntity[]): AlbumResponseDto[] {
    return entities.map(this.toResponse);
  }
}
