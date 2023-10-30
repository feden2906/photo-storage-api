import { UnauthorizedException } from '@nestjs/common';

import { TranslationHelper } from '../../helpers/translation.helper';

export class AccessTokenExpiredException extends UnauthorizedException {
  constructor() {
    super(TranslationHelper.t('exceptions', 'AccessTokenExpired'));
  }
}
