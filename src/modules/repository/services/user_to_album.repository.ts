import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { UserToAlbumEntity } from '../../../database/entities/user_to_album.entity';

@Injectable()
export class UserToAlbumRepository extends Repository<UserToAlbumEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(UserToAlbumEntity, dataSource.manager);
  }
}
