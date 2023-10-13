export class BaseAlbumResponseDto {
  id: string;
  name: string;
  album_owner: {
    id: string;
  };
  title_image?: {
    id: string;
    url: string;
  };
  created: Date;
  updated: Date;
}
