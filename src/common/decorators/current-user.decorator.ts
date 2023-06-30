import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { JwtPayload } from '../../modules/auth/models';

export const CurrentUser = createParamDecorator<JwtPayload>(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user as JwtPayload;
  },
);
