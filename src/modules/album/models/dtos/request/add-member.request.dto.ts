import { Transform } from 'class-transformer';
import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';

import { lowerCaseTransformer } from '../../../../../common/helpers';
import { AlbumRoleEnum } from '../../enums';

export class AddMemberRequestDto {
  @IsEnum(AlbumRoleEnum)
  role: AlbumRoleEnum;

  @Transform(({ value }) => lowerCaseTransformer.to(value))
  @IsNotEmpty()
  @IsEmail()
  memberEmail: string;
}
