import { ArrayMinSize, IsArray, IsUUID } from 'class-validator';

export class AlbumUploadRequestDto {
  @IsArray()
  @IsUUID(undefined, { each: true })
  @ArrayMinSize(1)
  mediaIds: string[];
}
