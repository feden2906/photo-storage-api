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

  public async getImageList(
    query: MediaListQueryDto,
  ): Promise<ListEntityType<MediaEntity>> {
    const queryBuilder = this.createQueryBuilder('image');
    queryBuilder.leftJoin('image.portfolio', 'portfolio');

    switch (query.orderBy) {
      case MediaSortFieldEnum.created:
        queryBuilder.orderBy('image.created', query.order);
        break;
    }

    queryBuilder.select([
      'image.id',
      'image.url',
      'image.description',
      'portfolio.id',
      'portfolio.name',
    ]);
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

  public async isExist(imageId: string): Promise<boolean> {
    return await this.exist({
      where: { id: imageId },
    });
  }

  public async findOneByIdAndOwner(
    userId: string,
    imageId: string,
  ): Promise<MediaEntity> {
    return await this.findOneBy({
      id: imageId,
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
