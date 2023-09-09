import { ConfigService, registerAs } from '@nestjs/config';

const configService = new ConfigService();
const configToken = 'app';
export default registerAs(configToken, () => ({
  environment: configService.get<string>('APP_ENVIRONMENT'),
  port: configService.get<number>('APP_PORT'),
  hostname: configService.get<string>('APP_HOST'),
}));
