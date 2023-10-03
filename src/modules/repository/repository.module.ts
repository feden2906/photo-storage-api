import { Global, Module } from '@nestjs/common';

import { AlbumRepository } from './services/album.repository';
import { MediaRepository } from './services/media.repository';
import { MediaToAlbumsRepository } from './services/media_to_albums.repository';
import { UserRepository } from './services/user.repository';

const repositories = [
  AlbumRepository,
  MediaRepository,
  MediaToAlbumsRepository,
  UserRepository,
];

@Global()
@Module({ providers: repositories, exports: repositories })
export class RepositoryModule {}
