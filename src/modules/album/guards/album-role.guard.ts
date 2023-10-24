import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { UserToAlbumRepository } from '../../repository/services/user_to_album.repository';
import { metadataKeys } from '../models/constants';
import { EAlbumRole } from '../models/enums';

@Injectable()
export class AlbumRoleGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private userToAlbumRepository: UserToAlbumRepository,
  ) {}
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    const { userId } = request.user;
    const { albumId } = request.params;

    const neededRole = this.reflector.get(
      metadataKeys.role,
      context.getHandler(),
    );

    const userTOA = await this.userToAlbumRepository.findOneBy({
      albumId,
      userId,
    });

    if (!userTOA) throw new ForbiddenException();

    const sortedRoles = Object.values(EAlbumRole);

    // await this.userToAlbumRepository.findOneBy({
    //   album: { id: albumId },
    //   user: { id: userId },
    // });

    const neededIndex = sortedRoles.findIndex((role) => role === neededRole);
    const userIndex = sortedRoles.findIndex((role) => role === userTOA.role);

    return neededIndex >= userIndex;
  }
}
