import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';

import { AlbumRoleGuard } from '../guards/album-role.guard';
import { EAlbumRole } from '../models/enums';

export function AlbumRoleDecorator(role: EAlbumRole) {
  return applyDecorators(SetMetadata('role', role), UseGuards(AlbumRoleGuard));
}
