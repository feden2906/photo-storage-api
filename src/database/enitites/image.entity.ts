import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { CreatedUpdatedDateModel } from './_created-updated-date.model';
import { UserEntity } from './user.entity';

@Entity('image')
export class ImageEntity extends CreatedUpdatedDateModel {
  @PrimaryGeneratedColumn('uuid') id: string;

  @Column('text', { nullable: false })
  name: string;

  @Column('text', { nullable: false })
  description: string;

  @Column('text', { nullable: false })
  url: string;

  @ManyToOne(() => UserEntity, (entity) => entity.images, {
    onDelete: 'CASCADE',
  })
  user: UserEntity;
}
