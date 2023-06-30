import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { DataSource, FindOptionsWhere, Repository } from 'typeorm';

import { ListEntityType } from '../../../common/types';
import { ImageEntity } from '../../../database';
import { BaseImageRequestDto, ImageListQueryDto } from '../models/dtos/request';
import { ImageSortFieldEnum } from '../models/enums';

@Injectable()
export class ImageRepository extends Repository<ImageEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(ImageEntity, dataSource.manager);
  }

  public async getImageList(
    query: ImageListQueryDto,
  ): Promise<ListEntityType<ImageEntity>> {
    const queryBuilder = this.createQueryBuilder('image');
    queryBuilder.leftJoin('image.portfolio', 'portfolio');

    switch (query.orderBy) {
      case ImageSortFieldEnum.created:
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
    dto: BaseImageRequestDto,
    url: string,
  ): Promise<ImageEntity> {
    return await this.save(
      plainToInstance(ImageEntity, {
        ...dto,
        url,
        portfolio: { id: portfolioId },
      }),
    );
  }

  public async isExist(imageId: string): Promise<boolean> {
    return await this.exist({
      where: { id: imageId },
    });
  }

  public async findOneByIdAndOwner(
    userId: string,
    imageId: string,
  ): Promise<ImageEntity> {
    return await this.findOneBy({
      id: imageId,
      user: { id: userId },
    });
  }

  public async findUrlsBy(
    where: FindOptionsWhere<ImageEntity>,
  ): Promise<Pick<ImageEntity, 'url'>[]> {
    return await this.find({
      where,
      select: { url: true },
    });
  }
}
