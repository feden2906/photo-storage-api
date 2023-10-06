import { Module } from '@nestjs/common';

import { UserRepository } from '../../../../modules/repository/services/user.repository';
import { UserSeedService } from './user-seed.service';

@Module({
  imports: [],
  providers: [UserSeedService, UserRepository],
  exports: [UserSeedService],
})
export class UserSeedModule {}
