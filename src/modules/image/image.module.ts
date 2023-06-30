import { Module } from '@nestjs/common';

import { AWSConfigModule } from '../../config/aws/config.module';
import { StorageModule } from '../storage/storage.module';
import { ImageController } from './image.controller';
import { ImageRepository } from './services/image.repository';
import { ImageService } from './services/image.service';

@Module({
  imports: [AWSConfigModule, StorageModule],
  controllers: [ImageController],
  providers: [ImageService, ImageRepository],
  exports: [ImageRepository],
})
export class ImageModule {}
