import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { CreatedUpdatedDateModel } from './_created-updated-date.model';
import { MediaEntity } from './media.entity';
import { MediaToAlbumEntity } from './media_to_album.entity';
import { UserToAlbumEntity } from './user_to_album.entity';

@Entity('album')
export class AlbumEntity extends CreatedUpdatedDateModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  name: string;

  @OneToMany(() => MediaToAlbumEntity, (entity) => entity.album)
  media_to_album: MediaToAlbumEntity[];

  @ManyToOne(() => MediaEntity, (entity) => entity.albums_title, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  title_image?: MediaEntity;

  @OneToMany(() => UserToAlbumEntity, (entity) => entity.album)
  user_to_album?: UserToAlbumEntity[];
}
