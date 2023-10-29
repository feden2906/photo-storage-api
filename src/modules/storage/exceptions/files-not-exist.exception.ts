import { BadRequestException } from '@nestjs/common';

import { TranslationHelper } from '../../../common/helpers/translation.helper';

export class FilesNotExistException extends BadRequestException {
  constructor() {
    super(TranslationHelper.t('exceptions', 'FilesNotExist'));
  }
}
