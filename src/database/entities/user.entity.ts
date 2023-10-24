import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import {
  lowerCaseTransformer,
  passwordHashTransformer,
} from '../../common/helpers';
import { CreatedUpdatedDateModel } from './_created-updated-date.model';
import { MediaEntity } from './media.entity';
import { UserToAlbumEntity } from './user_to_album.entity';

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

  @OneToMany(() => UserToAlbumEntity, (entity) => entity.user)
  user_to_album?: UserToAlbumEntity[];
}
