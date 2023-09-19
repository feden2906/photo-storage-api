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

  public async findManyByOwnerId(userId: string): Promise<AlbumEntity[]> {
    return await this.find({
      where: {
        album_owner: { id: userId },
      },
      relations: {
        title_image: true,
      },
    });
  }

  public async findOneByIdAndOwner(
    userId: string,
    albumId: string,
  ): Promise<AlbumEntity> {
    return await this.findOne({
      where: {
        id: albumId,
        album_owner: { id: userId },
      },
      relations: {
        media: true,
      },
    });
  }

  public async isExist(albumId: string): Promise<boolean> {
    return await this.exist({
      where: { id: albumId },
    });
  }
}
