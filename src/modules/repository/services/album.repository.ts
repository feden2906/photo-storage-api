import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { FindOptionsRelations } from 'typeorm/find-options/FindOptionsRelations';

import { AlbumEntity } from '../../../database';
import { AlbumCreateRequestDto } from '../../album/models/dtos/request';
import { MediaListQueryDto } from '../../media/models/dtos/request';

@Injectable()
export class AlbumRepository extends Repository<AlbumEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(AlbumEntity, dataSource.manager);
  }

  public async createAlbum(dto: AlbumCreateRequestDto): Promise<AlbumEntity> {
    return await this.save({
      ...dto,
    });
  }

  public async findManyByOwnerId(userId: string): Promise<AlbumEntity[]> {
    return await this.find({
      where: {
        user_to_album: {
          userId,
        },
      },
      relations: {
        title_image: true,
      },
    });
  }

  public async findOneByIdAndUserIdWithRelations(
    albumId: string,
    relations?: FindOptionsRelations<AlbumEntity>,
  ): Promise<AlbumEntity> {
    return await this.findOne({
      where: {
        id: albumId,
      },
      relations,
    });
  }

  public async getMediaListFromAlbum(
    albumId: string,
    query: MediaListQueryDto,
  ) {
    const queryBuilder = this.createQueryBuilder('album');

    queryBuilder.select([
      'album.id',
      'album.name',
      'album.created',
      'album.updated',
    ]);

    queryBuilder.where('album.id = :albumId', { albumId });
    queryBuilder.leftJoinAndSelect('album.media_to_album', 'mediaToAlbum');
    queryBuilder.leftJoinAndSelect('mediaToAlbum.media', 'media');

    // switch (query.orderBy) {
    //   case MediaSortFieldEnum.created:
    //     queryBuilder.orderBy('media.created', query.order);
    //     break;
    // }

    queryBuilder.limit(query.limit);
    queryBuilder.offset(query.offset);

    const [data, total] = await queryBuilder.getManyAndCount();

    return { data, total };
  }
}
