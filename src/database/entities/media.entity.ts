import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { CreatedUpdatedDateModel } from './_created-updated-date.model';
import { AlbumEntity } from './album.entity';
import { MediaToAlbumEntity } from './media_to_album.entity';
import { UserEntity } from './user.entity';

@Entity('media')
export class MediaEntity extends CreatedUpdatedDateModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { nullable: false })
  url: string;

  @OneToMany(() => MediaToAlbumEntity, (entity) => entity.media)
  media_to_album: MediaToAlbumEntity[];

  @OneToMany(() => AlbumEntity, (entity) => entity.title_image, {
    nullable: true,
  })
  albums_title?: AlbumEntity[];

  @ManyToOne(() => UserEntity, (entity) => entity.media, {
    onDelete: 'CASCADE',
  })
  user: UserEntity;
}
