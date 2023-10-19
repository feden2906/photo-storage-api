import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { CreatedUpdatedDateModel } from './_created-updated-date.model';
import { MediaEntity } from './media.entity';
import { MediaToAlbumsEntity } from './media_to_albums.entity';
import { RoleEntity } from './role.entity';
import { UserEntity } from './user.entity';
import { UserToAlbumsEntity } from './user_to_albums.entity';

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

  @OneToMany(() => RoleEntity, (entity) => entity.album)
  role: RoleEntity[];

  @ManyToOne(() => UserEntity, (entity) => entity.own_albums, {
    onDelete: 'CASCADE',
  })
  album_owner: UserEntity;

  @OneToMany(() => UserToAlbumsEntity, (entity) => entity.album)
  user_to_albums?: UserToAlbumsEntity[];
}
