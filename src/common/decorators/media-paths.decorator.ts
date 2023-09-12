import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const MediaPaths = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.paths as string[];
  },
);
