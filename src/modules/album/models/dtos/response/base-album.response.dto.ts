export class BaseAlbumResponseDto {
  id: string;
  name: string;
  album_owner: {
    id: string;
  };
  created: Date;
  updated: Date;
}
