import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { typeOrmStaticConfig } from '../../../config/database/static/type-orm-configuration-static';
import { UserSeedModule } from './user/user-seed.module';

@Module({
  imports: [UserSeedModule, TypeOrmModule.forRoot(typeOrmStaticConfig)],
})
export class SeedModule {}
