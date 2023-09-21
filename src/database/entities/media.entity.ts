import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { CreatedUpdatedDateModel } from './_created-updated-date.model';
import { AlbumEntity } from './album.entity';
import { MediaToAlbumsEntity } from './media_to_albums.entity';
import { UserEntity } from './user.entity';

@Entity('media')
export class MediaEntity extends CreatedUpdatedDateModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { nullable: false })
  url: string;

  @OneToMany(() => MediaToAlbumsEntity, (entity) => entity.media)
  media_to_albums: MediaToAlbumsEntity[];

  @OneToMany(() => AlbumEntity, (entity) => entity.title_image, {
    nullable: true,
  })
  albums_title?: AlbumEntity[];

  @ManyToOne(() => UserEntity, (entity) => entity.media, {
    onDelete: 'CASCADE',
  })
  user: UserEntity;
}
