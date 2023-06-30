import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { ExtractJwt } from 'passport-jwt';

import { SKIP_AUTH } from '../../../common/constants';
import { InvalidTokenException } from '../../../common/http';
import { TokenType } from '../models';
import { TokenService } from '../services/token.service';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private tokenService: TokenService,
    private reflector: Reflector,
  ) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const skipAuth = this.reflector.getAllAndOverride<boolean>(SKIP_AUTH, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (skipAuth) return true;

    const request = context.switchToHttp().getRequest();

    const accessToken = ExtractJwt.fromAuthHeaderAsBearerToken()(request);
    if (!accessToken) {
      throw new InvalidTokenException();
    }

    const payload = this.tokenService.verifyToken(
      accessToken,
      TokenType.Access,
    );
    if (!payload) {
      throw new UnauthorizedException();
    }
    return super.canActivate(context);
  }
}
