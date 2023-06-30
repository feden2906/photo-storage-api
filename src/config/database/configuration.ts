import { registerAs } from '@nestjs/config';

const configToken = 'postgresql';
export default registerAs(configToken, () => ({
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  runMigrations: process.env.POSTGRES_RUN_MIGRATIONS,
}));
