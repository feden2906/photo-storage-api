import { Module } from '@nestjs/common';

import { StorageModule } from '../storage/storage.module';
import { UserService } from './services/user.service';
import { UserController } from './user.controller';

@Module({
  imports: [StorageModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
