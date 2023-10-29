import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { FindOptionsRelations } from 'typeorm/find-options/FindOptionsRelations';

import { AlbumEntity } from '../../../database';
import { AlbumCreateRequestDto } from '../../album/models/dtos/request';

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
}
