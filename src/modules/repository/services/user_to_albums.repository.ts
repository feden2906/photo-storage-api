import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { UserToAlbumsEntity } from '../../../database/entities/user_to_albums.entity';

@Injectable()
export class UserToAlbumsRepository extends Repository<UserToAlbumsEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(UserToAlbumsEntity, dataSource.manager);
  }
}
