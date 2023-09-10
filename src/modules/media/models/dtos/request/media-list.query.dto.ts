import { IsEnum, IsOptional } from 'class-validator';

import { OrderEnum } from '../../../../../common/models';
import { PaginationQueryAbstractDto } from '../../../../../common/models/dtos';
import { MediaSortFieldEnum } from '../../enums';

export class MediaListQueryDto extends PaginationQueryAbstractDto {
  @IsOptional()
  @IsEnum(OrderEnum)
  order?: OrderEnum = OrderEnum.DESC;

  @IsOptional()
  @IsEnum(MediaSortFieldEnum)
  orderBy?: MediaSortFieldEnum = MediaSortFieldEnum.created;
}
