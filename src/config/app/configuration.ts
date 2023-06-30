import { registerAs } from '@nestjs/config';

const configToken = 'app';
export default registerAs(configToken, () => ({
  environment: process.env.APP_ENVIRONMENT,
  port: process.env.APP_PORT,
  accessTokenSecret: process.env.AUTH_ACCESS_TOKEN_SECRET,
  refreshTokenSecret: process.env.AUTH_REFRESH_TOKEN_SECRET,
  accessTokenExpiration: process.env.AUTH_ACCESS_TOKEN_EXPIRATION,
  refreshTokenExpiration: process.env.AUTH_REFRESH_TOKEN_EXPIRATION,
}));
