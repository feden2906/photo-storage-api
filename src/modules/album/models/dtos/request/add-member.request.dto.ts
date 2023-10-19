import { IsEnum, IsUUID } from 'class-validator';

import { ERole } from '../../../../role/models/enums';

export class AddMemberRequestDto {
  @IsEnum(ERole)
  role: ERole;

  @IsUUID()
  memberId: string;
}
