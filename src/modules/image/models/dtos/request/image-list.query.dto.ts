import { IsEnum, IsOptional } from 'class-validator';

import { OrderEnum } from '../../../../../common/models';
import { PaginationQueryAbstractDto } from '../../../../../common/models/dtos';
import { ImageSortFieldEnum } from '../../enums';

export class ImageListQueryDto extends PaginationQueryAbstractDto {
  @IsOptional()
  @IsEnum(OrderEnum)
  order?: OrderEnum = OrderEnum.DESC;

  @IsOptional()
  @IsEnum(ImageSortFieldEnum)
  orderBy?: ImageSortFieldEnum = ImageSortFieldEnum.created;
}
