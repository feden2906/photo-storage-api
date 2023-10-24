import { Global, Module } from '@nestjs/common';

import { AlbumRepository } from './services/album.repository';
import { MediaRepository } from './services/media.repository';
import { MediaToAlbumRepository } from './services/media_to_album.repository';
import { UserRepository } from './services/user.repository';
import { UserToAlbumRepository } from './services/user_to_album.repository';

const repositories = [
  AlbumRepository,
  MediaRepository,
  MediaToAlbumRepository,
  UserRepository,
  UserToAlbumRepository,
];

@Global()
@Module({ providers: repositories, exports: repositories })
export class RepositoryModule {}
