import { UnauthorizedException } from '@nestjs/common';

import { ErrorType } from '../../models';

export class AccessTokenExpiredException extends UnauthorizedException {
  constructor() {
    super({
      errorType: ErrorType.AccessTokenExpired,
      message: 'Access token has expired',
    });
  }
}
