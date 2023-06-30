import { PickType } from '@nestjs/swagger';

import { BaseUserRequestDto } from './base-user.request.dto';

export class UserLoginRequestDto extends PickType(BaseUserRequestDto, [
  'email',
  'password',
]) {}
