import { Module } from '@nestjs/common';

import { AWSConfigModule } from '../../config/aws/config.module';
import { StorageModule } from '../storage/storage.module';
import { MediaController } from './media.controller';
import { MediaService } from './services/media.service';

@Module({
  imports: [AWSConfigModule, StorageModule],
  controllers: [MediaController],
  providers: [MediaService],
  exports: [MediaService],
})
export class MediaModule {}
