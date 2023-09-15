import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { AlbumEntity } from '../../../database';
import { AlbumCreateRequestDto } from '../models/dtos/request';

@Injectable()
export class AlbumRepository extends Repository<AlbumEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(AlbumEntity, dataSource.manager);
  }

  public async createAlbum(
    dto: AlbumCreateRequestDto,
    userId: string,
  ): Promise<AlbumEntity> {
    return await this.save({
      ...dto,
      album_owner: { id: userId },
    });
  }
}
