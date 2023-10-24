import { Transform } from 'class-transformer';
import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';

import { lowerCaseTransformer } from '../../../../../common/helpers';
import { EAlbumRole } from '../../enums';

export class AddMemberRequestDto {
  @IsEnum(EAlbumRole)
  role: EAlbumRole;

  @Transform(({ value }) => lowerCaseTransformer.to(value))
  @IsNotEmpty()
  @IsEmail()
  memberEmail: string;
}
