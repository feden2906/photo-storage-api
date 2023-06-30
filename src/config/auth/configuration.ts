import { registerAs } from '@nestjs/config';

const configToken = 'auth';
export default registerAs(configToken, () => ({
  accessTokenSecret: process.env.AUTH_ACCESS_TOKEN_SECRET,
  refreshTokenSecret: process.env.AUTH_REFRESH_TOKEN_SECRET,
  accessTokenExpiration: process.env.AUTH_ACCESS_TOKEN_EXPIRATION,
  refreshTokenExpiration: process.env.AUTH_REFRESH_TOKEN_EXPIRATION,
}));
