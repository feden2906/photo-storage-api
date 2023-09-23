import { Global, Module } from '@nestjs/common';

import { AlbumRepository } from './services/album.repository';
import { MediaRepository } from './services/media.repository';
import { MediaToAlbumsRepository } from './services/media_to_albums.repository';

const repositories = [
  MediaRepository,
  MediaToAlbumsRepository,
  AlbumRepository,
];

@Global()
@Module({ providers: repositories, exports: repositories })
export class RepositoryModule {}
