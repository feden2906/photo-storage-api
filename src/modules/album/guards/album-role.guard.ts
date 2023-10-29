import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { NoPermissionException } from '../../../common/http';
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

    const userToAlbum = await this.userToAlbumRepository.findOneBy({
      albumId,
      userId,
    });

    if (!userToAlbum) throw new NoPermissionException();

    const sortedRoles = Object.values(EAlbumRole);

    const neededIndex = sortedRoles.findIndex((role) => role === neededRole);
    const userIndex = sortedRoles.findIndex(
      (role) => role === userToAlbum.role,
    );

    return neededIndex >= userIndex;
  }
}
