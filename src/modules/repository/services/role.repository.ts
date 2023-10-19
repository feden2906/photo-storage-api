import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { RoleEntity } from '../../../database/entities/role.entity';

@Injectable()
export class RoleRepository extends Repository<RoleEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(RoleEntity, dataSource.manager);
  }
}
