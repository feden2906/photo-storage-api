import { ConflictException } from '@nestjs/common';

import { TranslationHelper } from '../../helpers/translation.helper';

export class SomeConflictException extends ConflictException {
  constructor() {
    super(TranslationHelper.t('exceptions', 'Conflict'));
  }
}
