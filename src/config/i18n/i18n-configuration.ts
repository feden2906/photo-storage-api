import {
  AcceptLanguageResolver,
  HeaderResolver,
  I18nAsyncOptions,
  QueryResolver,
} from 'nestjs-i18n';
import * as path from 'path';

import { i18nConfigModule } from './config.module';
import { i18nConfigService } from './configuration.service';

export const i18nConfig: I18nAsyncOptions = {
  imports: [i18nConfigModule],
  useFactory: (appConfigService: i18nConfigService) => ({
    fallbackLanguage: appConfigService.fallbackLanguage,
    loaderOptions: {
      path: path.join(__dirname, '..', '..', 'i18n'),
      watch: true,
    },
  }),
  resolvers: [
    { use: QueryResolver, options: ['lang'] },
    AcceptLanguageResolver,
    new HeaderResolver(['x-lang']),
  ],
  inject: [i18nConfigService],
};
