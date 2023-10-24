import { Injectable } from '@nestjs/common';
import { DataSource, FindOptionsWhere, In, Not, Repository } from 'typeorm';

import { ListEntityType } from '../../../common/types';
import { MediaEntity } from '../../../database';
import { MediaListQueryDto } from '../../media/models/dtos/request';
import { MediaSortFieldEnum } from '../../media/models/enums';

@Injectable()
export class MediaRepository extends Repository<MediaEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(MediaEntity, dataSource.manager);
  }

  public async getMediaList(
    query: MediaListQueryDto,
  ): Promise<ListEntityType<MediaEntity>> {
    const queryBuilder = this.createQueryBuilder('media');

    switch (query.orderBy) {
      case MediaSortFieldEnum.created:
        queryBuilder.orderBy('media.created', query.order);
        break;
    }

    queryBuilder.select(['media.id', 'media.url', 'media.created']);
    queryBuilder.limit(query.limit);
    queryBuilder.offset(query.offset);

    const [data, total] = await queryBuilder.getManyAndCount();
    return { data, total };
  }

  public async findOneByMediaIdsNotInAndAlbumId(
    mediaIds: string[],
    albumId: string,
  ) {
    return await this.findOneBy({
      media_to_album: {
        albumId,
      },
      id: Not(In(mediaIds)),
    });
  }

  // public async createImage(
  //   userId: string,
  //   dto: BaseMediaRequestDto,
  //   url: string,
  // ): Promise<MediaEntity> {
  //   return await this.save({
  //     ...dto,
  //     url,
  //     portfolio: { id: portfolioId },
  //   });
  // }

  public async createImage(url: string, userId: string): Promise<MediaEntity> {
    return await this.save({
      url,
      user: { id: userId },
    });
  }

  public async isExist(mediaId: string): Promise<boolean> {
    return await this.exist({
      where: { id: mediaId },
    });
  }

  public async findOneByIdAndOwnerIdAndAlbumId(
    mediaId: string,
    userId: string,
    albumId: string,
  ): Promise<MediaEntity> {
    return await this.findOneBy({
      id: mediaId,
      user: { id: userId },
      media_to_album: {
        albumId,
      },
    });
  }

  public async findOneByIdAndOwner(
    userId: string,
    mediaId: string,
  ): Promise<MediaEntity> {
    return await this.findOneBy({
      id: mediaId,
      user: { id: userId },
    });
  }

  public async findManyByIdsAndOwner(
    userId: string,
    mediaIds: string[],
  ): Promise<MediaEntity[]> {
    return await this.findBy({
      user: { id: userId },
      id: In(mediaIds),
    });
  }

  public async findUrlsBy(
    where: FindOptionsWhere<MediaEntity>,
  ): Promise<Pick<MediaEntity, 'url'>[]> {
    return await this.find({
      where,
      select: { url: true },
    });
  }
}
