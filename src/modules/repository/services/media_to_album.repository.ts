import { Injectable } from '@nestjs/common';
import { DataSource, In, Repository } from 'typeorm';

import { MediaToAlbumEntity } from '../../../database/entities/media_to_album.entity';

@Injectable()
export class MediaToAlbumRepository extends Repository<MediaToAlbumEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(MediaToAlbumEntity, dataSource.manager);
  }

  public async findManyByUserAndAlbumAndMedia(
    userId: string,
    albumId: string,
    mediaIds: string[],
  ): Promise<MediaToAlbumEntity[]> {
    return await this.find({
      where: {
        albumId,
        media: { id: In(mediaIds), user: { id: userId } },
      },
    });
  }
}
