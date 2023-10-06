import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { CreatedUpdatedDateModel } from './_created-updated-date.model';
import { MediaEntity } from './media.entity';
import { MediaToAlbumsEntity } from './media_to_albums.entity';
import { UserEntity } from './user.entity';

@Entity('album')
export class AlbumEntity extends CreatedUpdatedDateModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  name: string;

  @OneToMany(() => MediaToAlbumsEntity, (entity) => entity.album)
  media_to_albums: MediaToAlbumsEntity[];

  @ManyToOne(() => MediaEntity, (entity) => entity.albums_title, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  title_image?: MediaEntity;

  @ManyToOne(() => UserEntity, (entity) => entity.own_albums, {
    onDelete: 'CASCADE',
  })
  album_owner: UserEntity;

  @ManyToMany(() => UserEntity, (entity) => entity.side_albums, {
    nullable: true,
  })
  album_viewers?: UserEntity[];
}
