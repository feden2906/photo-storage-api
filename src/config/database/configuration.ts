import { ConfigService, registerAs } from '@nestjs/config';

const configService = new ConfigService();
const configToken = 'postgresql';

export default registerAs(configToken, () => ({
  host: configService.get<string>('POSTGRES_HOST'),
  port: configService.get<number>('POSTGRES_PORT'),
  user: configService.get<string>('POSTGRES_USER'),
  password: configService.get<string>('POSTGRES_PASSWORD'),
  database: configService.get<string>('POSTGRES_DATABASE'),
  runMigrations: configService.get<string>('POSTGRES_RUN_MIGRATIONS'),
}));
