import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class BaseImageRequestDto {
  @IsNotEmpty()
  @IsString()
  @Length(2, 50)
  name: string;

  @IsNotEmpty()
  @IsString()
  @Length(20, 500)
  description: string;

  @ApiProperty({ type: 'string', format: 'binary', required: true })
  image: Express.Multer.File;
}
