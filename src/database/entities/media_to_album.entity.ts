import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

import { AlbumEntity } from './album.entity';
import { MediaEntity } from './media.entity';

@Entity('media_to_album')
export class MediaToAlbumEntity {
  @PrimaryColumn()
  albumId: string;

  @PrimaryColumn()
  mediaId: string;

  @ManyToOne(() => AlbumEntity, (entity) => entity.media_to_album, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'albumId' })
  album: AlbumEntity;

  @ManyToOne(() => MediaEntity, (entity) => entity.media_to_album, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'mediaId' })
  media: MediaEntity;
}
