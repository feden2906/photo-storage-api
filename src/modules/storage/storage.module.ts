import { Module } from '@nestjs/common';

import { AWSConfigModule } from '../../config/aws/config.module';
import { StorageService } from './services/storage.service';

@Module({
  imports: [AWSConfigModule],
  controllers: [],
  providers: [StorageService],
  exports: [StorageService],
})
export class StorageModule {}
