import { ConfigService, registerAs } from '@nestjs/config';

const configService = new ConfigService();
const configToken = 'auth';
export default registerAs(configToken, () => ({
  accessTokenSecret: configService.get<string>('AUTH_ACCESS_TOKEN_SECRET'),
  refreshTokenSecret: configService.get<string>('AUTH_REFRESH_TOKEN_SECRET'),
  accessTokenExpiration: configService.get<string>(
    'AUTH_ACCESS_TOKEN_EXPIRATION',
  ),
  refreshTokenExpiration: configService.get<string>(
    'AUTH_REFRESH_TOKEN_EXPIRATION',
  ),
}));
