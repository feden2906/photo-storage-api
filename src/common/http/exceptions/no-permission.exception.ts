import { ForbiddenException } from '@nestjs/common';

import { TranslationHelper } from '../../helpers/translation.helper';

export class NoPermissionException extends ForbiddenException {
  constructor() {
    super(TranslationHelper.t('exceptions', 'NoPermission'));
  }
}
