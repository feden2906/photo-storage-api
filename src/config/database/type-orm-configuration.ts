import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import * as path from 'path';

import { PostgresqlConfigModule } from './config.module';
import { PostgresqlConfigService } from './configuration.service';

export const typeOrmConfig: TypeOrmModuleAsyncOptions = {
  imports: [PostgresqlConfigModule],
  useFactory: (configService: PostgresqlConfigService) => ({
    type: 'postgres',
    host: configService.host,
    port: configService.port,
    username: configService.user,
    password: configService.password,
    database: configService.database,
    migrationsRun: configService.runMigrations,
    synchronize: false,
    entities: [path.join(__dirname, '..', '..', '**', '*.entity{.ts,.js}')],
    migrationsTableName: 'migrations',
    migrations: [
      path.join(__dirname, '..', '..', 'database', 'migrations', '*{.ts,.js}'),
    ],
  }),
  inject: [PostgresqlConfigService],
};
