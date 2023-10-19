import { Global, Module } from '@nestjs/common';

import { AlbumRepository } from './services/album.repository';
import { MediaRepository } from './services/media.repository';
import { MediaToAlbumsRepository } from './services/media_to_albums.repository';
import { RoleRepository } from './services/role.repository';
import { UserRepository } from './services/user.repository';
import { UserToAlbumsRepository } from './services/user_to_albums.repository';

const repositories = [
  AlbumRepository,
  MediaRepository,
  MediaToAlbumsRepository,
  UserRepository,
  RoleRepository,
  UserToAlbumsRepository,
];

@Global()
@Module({ providers: repositories, exports: repositories })
export class RepositoryModule {}
