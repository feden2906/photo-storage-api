import { Transform } from 'class-transformer';
import { IsAlphanumeric, IsEmail, IsNotEmpty, Length } from 'class-validator';

import { lowerCaseTransformer } from '../../../../../common/helpers';

export class BaseUserRequestDto {
  @Transform(({ value }) => lowerCaseTransformer.to(value))
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
