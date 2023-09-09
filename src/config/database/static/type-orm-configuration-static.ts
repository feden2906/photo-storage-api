import { DataSourceOptions } from 'typeorm';

import { PostgresqlConfigServiceStatic } from './configuration.service-static';

const folder = !process.env.NODE_ENV ? 'src' : 'dist/src';
export const typeOrmStaticConfig: DataSourceOptions = {
  type: 'postgres',
  host: PostgresqlConfigServiceStatic.host,
  port: PostgresqlConfigServiceStatic.port,
  username: PostgresqlConfigServiceStatic.user,
  password: PostgresqlConfigServiceStatic.password,
  database: PostgresqlConfigServiceStatic.database,
  synchronize: false,
  migrationsRun: PostgresqlConfigServiceStatic.runMigrations,
  migrationsTableName: 'migrations',
  entities: [folder + '/**/*.entity{.ts,.js}'],
  migrations: [folder + '/database/migrations/*{.js,.ts}'],
};
