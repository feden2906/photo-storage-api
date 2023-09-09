import { ListEntityType } from '../../../common/types';
import { AWSConfigServiceStatic } from '../../../config/aws/configuration.service-static';
import { MediaEntity } from '../../../database';
import { MediaListQueryDto } from '../models/dtos/request';
import {
  MediaListItemResponseDto,
  MediaListResponseDto,
} from '../models/dtos/response';

export class MediaMapper {
  // public static toResponseDto(entity: MediaEntity): MediaResponseDto {
  //   return {
  //     id: entity.id,
  //     url: MediaMapper.buildUrl(entity.url),
  //     name: entity.name,
  //     description: entity.description,
  //   };
  // }

  public static toResponseListDto(
    list: ListEntityType<MediaEntity>,
    query: MediaListQueryDto,
  ): MediaListResponseDto {
    return {
      data: list.data.map(this.toResponseListItemDto),
      total: list.total,
      ...query,
    };
  }

  public static toResponseListItemDto(
    entity: MediaEntity,
  ): MediaListItemResponseDto {
    return {
      id: entity.id,
      url: MediaMapper.buildUrl(entity.url),
    };
  }

  private static buildUrl(urlFromDB: string): string {
    return `${AWSConfigServiceStatic.bucketPath}/${urlFromDB}`;
  }
}
