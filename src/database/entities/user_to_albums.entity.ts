import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

import { AlbumEntity } from './album.entity';
import { UserEntity } from './user.entity';

@Entity('user_to_albums')
export class UserToAlbumsEntity {
  @PrimaryColumn()
  albumId: string;

  @PrimaryColumn()
  userId: string;

  @ManyToOne(() => AlbumEntity, (entity) => entity.user_to_albums, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'albumId' })
  album: AlbumEntity;

  @ManyToOne(() => UserEntity, (entity) => entity.user_to_albums, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'mediaId' })
  user: UserEntity;
}
