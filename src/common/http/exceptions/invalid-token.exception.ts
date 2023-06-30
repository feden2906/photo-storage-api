import { UnauthorizedException } from '@nestjs/common';

import { ErrorType } from '../../models';

export class InvalidTokenException extends UnauthorizedException {
  constructor() {
    super({ errorType: ErrorType.InvalidToken });
  }
}
