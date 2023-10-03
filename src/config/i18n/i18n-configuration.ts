import * as path from 'node:path';

import {
  AcceptLanguageResolver,
  I18nAsyncOptions,
  QueryResolver,
} from 'nestjs-i18n';
import { I18nOptionsWithoutResolvers } from 'nestjs-i18n/dist/interfaces/i18n-options.interface';

import { SupportedLanguagesEnum } from '../../common/models/enums/supported-languages.enum';

export const i18nConfig: I18nAsyncOptions = {
  useFactory: (): I18nOptionsWithoutResolvers => ({
    skipAsyncHook: false,
    fallbackLanguage: SupportedLanguagesEnum.EN,
    loaderOptions: {
      path: path.join(
        __dirname,
        '..',
        '..',
        'common',
        'http',
        'i18n',
        'constants',
      ),
      watch: false,
    },
    typesOutputPath: path.join(
      process.cwd(),
      'src',
      'common',
      'http',
      'i18n',
      'i18n.generated.ts',
    ),
  }),
  resolvers: [AcceptLanguageResolver, new QueryResolver(['lang'])],
};
