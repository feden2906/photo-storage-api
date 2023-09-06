import { ListEntityType } from '../../../common/types';
import { AWSConfigServiceStatic } from '../../../config/aws/configuration.service-static';
import { ImageEntity } from '../../../database';
import { ImageListQueryDto } from '../models/dtos/request';
import {
  ImageListItemResponseDto,
  ImageListResponseDto,
} from '../models/dtos/response';

export class ImageMapper {
  // public static toResponseDto(entity: ImageEntity): ImageResponseDto {
  //   return {
  //     id: entity.id,
  //     url: ImageMapper.buildUrl(entity.url),
  //     name: entity.name,
  //     description: entity.description,
  //   };
  // }

  public static toResponseListDto(
    list: ListEntityType<ImageEntity>,
    query: ImageListQueryDto,
  ): ImageListResponseDto {
    return {
      data: list.data.map(this.toResponseListItemDto),
      total: list.total,
      ...query,
    };
  }

  public static toResponseListItemDto(
    entity: ImageEntity,
  ): ImageListItemResponseDto {
    return {
      id: entity.id,
      url: ImageMapper.buildUrl(entity.url),
    };
  }

  private static buildUrl(urlFromDB: string): string {
    return `${AWSConfigServiceStatic.bucketPath}/${urlFromDB}`;
  }
}
