import { Injectable } from '@nestjs/common';

import { UserRepository } from '../../../../modules/user/services/user.repository';
import { CreateSeedError } from '../../errors/create-seed.error';
import { readSeedFile } from '../../helpers/read-seed-file';
import { SeedLogger } from '../../helpers/seed-logger';
import { IUserSeed } from './user-seed.interface';

@Injectable()
export class UserSeedService {
  constructor(private repository: UserRepository) {}

  async run(): Promise<void> {
    const tableName = 'user';
    try {
      SeedLogger.start(tableName);

      const data = await readSeedFile<IUserSeed>(__dirname);
      const entities = data.map((user) => this.repository.create(user));
      await this.repository.save(entities);

      SeedLogger.end(tableName);
    } catch (e) {
      throw new CreateSeedError(tableName);
    }
  }
}
