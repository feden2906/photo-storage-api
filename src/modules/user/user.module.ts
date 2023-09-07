import { Module } from '@nestjs/common';

import { MediaModule } from '../image/media.module';
import { StorageModule } from '../storage/storage.module';
import { UserRepository } from './services/user.repository';
import { UserService } from './services/user.service';
import { UserController } from './user.controller';

@Module({
  imports: [MediaModule, StorageModule],
  controllers: [UserController],
  providers: [UserService, UserRepository],
})
export class UserModule {}
