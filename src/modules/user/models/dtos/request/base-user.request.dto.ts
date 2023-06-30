import { Transform } from 'class-transformer';
import { IsAlphanumeric, IsEmail, IsNotEmpty, Length } from 'class-validator';

import { lowerCaseTransformer } from '../../../../../common/helpers';

export class BaseUserRequestDto {
  @Transform(() => lowerCaseTransformer)
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsAlphanumeric()
  @Length(6, 20)
  password: string;

  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;
}
