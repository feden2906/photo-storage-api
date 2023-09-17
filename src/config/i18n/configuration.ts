import { ConfigService, registerAs } from '@nestjs/config';

const configService = new ConfigService();
const configToken = 'i18n';

export default registerAs(configToken, () => ({
  fallbackLanguage: configService.get<string>('FALLBACK_LANGUAGE'),
}));
