import { Module } from '@nestjs/common';

import { AlbumController } from './album.controller';
import { AlbumRepository } from './services/album.repository';
import { AlbumService } from './services/album.service';

@Module({
  controllers: [AlbumController],
  providers: [AlbumService, AlbumRepository],
})
export class AlbumModule {}
