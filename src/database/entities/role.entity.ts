import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { AlbumEntity } from './album.entity';
import { UserEntity } from './user.entity';

@Entity('role')
export class RoleEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('jsonb', { default: [] })
  roles: string[];

  @ManyToOne(() => UserEntity, (entity) => entity.roles)
  user: UserEntity;

  @ManyToOne(() => AlbumEntity, (entity) => entity.role)
  album: AlbumEntity;
}
