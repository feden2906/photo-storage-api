import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { AlbumEntity } from './album.entity';
import { MediaEntity } from './media.entity';

@Entity('media_to_albums')
export class MediaToAlbumsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => AlbumEntity, (entity) => entity.media_to_albums)
  album: AlbumEntity;

  @ManyToOne(() => MediaEntity, (entity) => entity.media_to_albums)
  media: MediaEntity;
}
