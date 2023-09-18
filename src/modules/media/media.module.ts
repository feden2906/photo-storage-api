import { Module } from '@nestjs/common';

import { AWSConfigModule } from '../../config/aws/config.module';
import { StorageModule } from '../storage/storage.module';
import { MediaController } from './media.controller';
import { MediaRepository } from './services/media.repository';
import { MediaService } from './services/media.service';

@Module({
  imports: [AWSConfigModule, StorageModule],
  controllers: [MediaController],
  providers: [MediaService, MediaRepository],
  exports: [MediaRepository, MediaService],
})
export class MediaModule {}
