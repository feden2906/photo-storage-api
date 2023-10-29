import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';

import { AlbumRoleGuard } from '../guards/album-role.guard';
import { AlbumRoleEnum } from '../models/enums';

export function AlbumRoleDecorator(role: AlbumRoleEnum) {
  return applyDecorators(SetMetadata('role', role), UseGuards(AlbumRoleGuard));
}
