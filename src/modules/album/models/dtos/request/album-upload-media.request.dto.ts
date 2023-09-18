import { ArrayMinSize, IsArray, IsUUID } from 'class-validator';

export class AlbumUploadMediaRequestDto {
  @IsArray()
  @IsUUID(undefined, { each: true })
  @ArrayMinSize(1)
  mediaIds: string[];
}
