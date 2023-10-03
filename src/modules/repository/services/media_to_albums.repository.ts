import { Injectable } from '@nestjs/common';
import { DataSource, In, Repository } from 'typeorm';

import { MediaToAlbumsEntity } from '../../../database/entities/media_to_albums.entity';

@Injectable()
export class MediaToAlbumsRepository extends Repository<MediaToAlbumsEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(MediaToAlbumsEntity, dataSource.manager);
  }

  public async findManyByUserAndAlbumAndMedia(
    userId: string,
    albumId: string,
    mediaIds: string[],
  ): Promise<MediaToAlbumsEntity[]> {
    return await this.find({
      where: {
        albumId,
        media: { id: In(mediaIds), user: { id: userId } },
      },
    });
  }
}
