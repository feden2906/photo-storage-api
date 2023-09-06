import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { CreatedUpdatedDateModel } from './_created-updated-date.model';
import { AlbumEntity } from './album.entity';
import { UserEntity } from './user.entity';

@Entity('image')
export class ImageEntity extends CreatedUpdatedDateModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { nullable: false })
  url: string;

  @ManyToMany(() => AlbumEntity, (entity) => entity.images, { nullable: true })
  @JoinTable()
  albums?: AlbumEntity[];

  @OneToMany(() => AlbumEntity, (entity) => entity.title_image, {
    nullable: true,
  })
  albums_title?: AlbumEntity[];

  @ManyToOne(() => UserEntity, (entity) => entity.images, {
    onDelete: 'CASCADE',
  })
  user: UserEntity;
}
