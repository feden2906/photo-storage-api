import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import {
  lowerCaseTransformer,
  passwordHashTransformer,
} from '../../common/helpers';
import { CreatedUpdatedDateModel } from './_created-updated-date.model';
import { AlbumEntity } from './album.entity';
import { MediaEntity } from './media.entity';
import { RoleEntity } from './role.entity';
import { UserToAlbumsEntity } from './user_to_albums.entity';

@Entity('user')
export class UserEntity extends CreatedUpdatedDateModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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

  @OneToMany(() => MediaEntity, (entity) => entity.user, { nullable: true })
  media?: MediaEntity[];

  @OneToMany(() => RoleEntity, (entity) => entity.user)
  roles: RoleEntity[];

  @OneToMany(() => AlbumEntity, (entity) => entity.album_owner, {
    nullable: true,
  })
  own_albums?: AlbumEntity[];

  @OneToMany(() => UserToAlbumsEntity, (entity) => entity.user)
  user_to_albums?: UserToAlbumsEntity[];
}
