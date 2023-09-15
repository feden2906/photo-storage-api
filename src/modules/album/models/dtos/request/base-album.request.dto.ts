import { IsNotEmpty, IsString, Length } from 'class-validator';

export class BaseAlbumRequestDto {
  @IsNotEmpty()
  @IsString()
  @Length(2, 50)
  name: string;
}
