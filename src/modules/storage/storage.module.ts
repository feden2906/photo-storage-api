import { Module } from '@nestjs/common';

import { AWSConfigModule } from '../../config/aws/config.module';
import { S3StorageService } from './services/s3-storage.service';
import { StorageService } from './services/storage.service';

@Module({
  imports: [AWSConfigModule],
  controllers: [],
  providers: [
    {
      provide: 'StorageProviderService',
      useClass: S3StorageService,
    },
    StorageService,
  ],
  exports: [StorageService],
})
export class StorageModule {}
