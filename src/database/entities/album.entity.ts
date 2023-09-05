import { Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { CreatedUpdatedDateModel } from './_created-updated-date.model';
import { ImageEntity } from './image.entity';
import { UserEntity } from './user.entity';

@Entity('album')
export class AlbumEntity extends CreatedUpdatedDateModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToMany(() => ImageEntity, (entity) => entity.albums, { nullable: true })
  images?: ImageEntity[];

  @ManyToOne(() => ImageEntity, (entity) => entity.id, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  title_image?: ImageEntity;

  @ManyToOne(() => UserEntity, (entity) => entity.own_albums, {
    onDelete: 'CASCADE',
  })
  album_owner: UserEntity;

  @ManyToMany(() => UserEntity, (entity) => entity.side_albums, {
    nullable: true,
  })
  album_viewers?: UserEntity[];
}
