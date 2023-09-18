import { Module } from '@nestjs/common';

import { MediaModule } from '../media/media.module';
import { AlbumController } from './album.controller';
import { AlbumRepository } from './services/album.repository';
import { AlbumService } from './services/album.service';

@Module({
  imports: [MediaModule],
  controllers: [AlbumController],
  providers: [AlbumService, AlbumRepository],
})
export class AlbumModule {}
