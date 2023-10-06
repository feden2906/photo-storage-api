import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsString,
  IsUUID,
  Length,
} from 'class-validator';

export class BaseAlbumRequestDto {
  @IsNotEmpty()
  @IsString()
  @Length(2, 50)
  name: string;

  @IsArray()
  @IsUUID(undefined, { each: true })
  @ArrayMinSize(1)
  mediaIds: string[];
}
