import { ConflictException } from '@nestjs/common';

import { ErrorType } from '../../models';

export class EmailExistsException extends ConflictException {
  constructor(email: string) {
    super({
      errorType: ErrorType.EmailExists,
      message: `There's a user with the email '${email}'`,
    });
  }
}
