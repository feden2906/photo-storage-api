import { UnauthorizedException } from '@nestjs/common';

import { TranslationHelper } from '../../helpers/translation.helper';

export class RefreshTokenExpiredException extends UnauthorizedException {
  constructor() {
    super(TranslationHelper.t('exceptions', 'RefreshTokenExpired'));
  }
}
