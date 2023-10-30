import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  Unique,
} from 'typeorm';

import { AlbumRoleEnum } from '../../modules/album/models/enums';
import { AlbumEntity } from './album.entity';
import { UserEntity } from './user.entity';

@Entity('user_to_album')
@Unique(['albumId', 'userId'])
export class UserToAlbumEntity {
  @PrimaryColumn()
  albumId: string;

  @PrimaryColumn()
  userId: string;

  @Column({ enum: AlbumRoleEnum, type: 'enum' })
  role: AlbumRoleEnum;

  @ManyToOne(() => AlbumEntity, (entity) => entity.user_to_album, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'albumId' })
  album: AlbumEntity;

  @ManyToOne(() => UserEntity, (entity) => entity.user_to_album, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user: UserEntity;
}
