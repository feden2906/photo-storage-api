import { UnauthorizedException } from '@nestjs/common';

import { TranslationHelper } from '../../helpers/translation.helper';

export class InvalidCredentialsException extends UnauthorizedException {
  constructor() {
    super(TranslationHelper.t('exceptions', 'InvalidCredentials'));
  }
}
