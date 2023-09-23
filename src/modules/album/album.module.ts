import { Module } from '@nestjs/common';

import { MediaModule } from '../media/media.module';
import { AlbumRepository } from '../repository/services/album.repository';
import { AlbumController } from './album.controller';
import { AlbumService } from './services/album.service';

@Module({
  imports: [MediaModule],
  controllers: [AlbumController],
  providers: [AlbumService, AlbumRepository],
})
export class AlbumModule {}
