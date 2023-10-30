import { UnauthorizedException } from '@nestjs/common';

import { TranslationHelper } from '../../helpers/translation.helper';

export class InvalidTokenException extends UnauthorizedException {
  constructor() {
    super(TranslationHelper.t('exceptions', 'InvalidToken'));
  }
}
