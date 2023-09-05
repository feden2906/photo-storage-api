import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import {
  lowerCaseTransformer,
  passwordHashTransformer,
} from '../../common/helpers';
import { CreatedUpdatedDateModel } from './_created-updated-date.model';
import { AlbumEntity } from './album.entity';
import { ImageEntity } from './image.entity';

@Entity('user')
export class UserEntity extends CreatedUpdatedDateModel {
  @PrimaryGeneratedColumn('uuid') id: string;

  @Column('text', { nullable: false })
  firstName: string;

  @Column('text', { nullable: false })
  lastName: string;

  @Column('text', {
    unique: true,
    nullable: false,
    transformer: [lowerCaseTransformer],
  })
  email: string;

  @Column('text', {
    select: false,
    nullable: true,
    transformer: [passwordHashTransformer],
  })
  password?: string;

  @OneToMany(() => ImageEntity, (entity) => entity.user, { nullable: true })
  images?: ImageEntity[];

  @OneToMany(() => AlbumEntity, (entity) => entity.album_owner, {
    nullable: true,
  })
  own_albums?: AlbumEntity[];

  @ManyToMany(() => AlbumEntity, (entity) => entity.album_viewers, {
    nullable: true,
  })
  @JoinTable()
  side_albums?: AlbumEntity[];
}
