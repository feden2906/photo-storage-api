import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

import configuration from './configuration';

@Injectable()
export class i18nConfigService {
  constructor(
    @Inject(configuration.KEY)
    private i18nConfiguration: ConfigType<typeof configuration>,
  ) {}

  get fallbackLanguage(): string {
    return this.i18nConfiguration.fallbackLanguage;
  }
}
