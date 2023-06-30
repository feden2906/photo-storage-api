import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import {
  lowerCaseTransformer,
  passwordHashTransformer,
} from '../../common/helpers';
import { CreatedUpdatedDateModel } from './_created-updated-date.model';
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

  @OneToMany(() => ImageEntity, (entity) => entity.user)
  images: ImageEntity;
}
