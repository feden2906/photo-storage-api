import { Injectable } from '@nestjs/common';
import { DataSource, FindOptionsWhere, Repository } from 'typeorm';

import { ListEntityType } from '../../../common/types';
import { MediaEntity } from '../../../database';
import { BaseMediaRequestDto, MediaListQueryDto } from '../models/dtos/request';
import { MediaSortFieldEnum } from '../models/enums';

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

  public async createImage(
    userId: string,
    portfolioId: string,
    dto: BaseMediaRequestDto,
    url: string,
  ): Promise<MediaEntity> {
    return await this.save({
      ...dto,
      url,
      portfolio: { id: portfolioId },
    });
  }

  public async isExist(mediaId: string): Promise<boolean> {
    return await this.exist({
      where: { id: mediaId },
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

  public async findUrlsBy(
    where: FindOptionsWhere<MediaEntity>,
  ): Promise<Pick<MediaEntity, 'url'>[]> {
    return await this.find({
      where,
      select: { url: true },
    });
  }
}
