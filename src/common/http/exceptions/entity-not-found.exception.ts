import { UnprocessableEntityException } from '@nestjs/common';

import { TranslationHelper } from '../../helpers/translation.helper';

export class EntityNotFoundException extends UnprocessableEntityException {
  constructor() {
    super(TranslationHelper.t('exceptions', 'EntityNotFound'));
  }
}
