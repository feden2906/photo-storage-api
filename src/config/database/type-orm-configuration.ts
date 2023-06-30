import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { DataSourceOptions } from 'typeorm';

import { PostgresqlConfigModule } from './config.module';
import { PostgresqlConfigService } from './configuration.service';
import { PostgresqlConfigServiceStatic } from './configuration.service-static';

export class TypeOrmConfigurations {
  static get config(): TypeOrmModuleAsyncOptions {
    const environment = !!process.env.NODE_ENV;
    return {
      imports: [PostgresqlConfigModule],
      useFactory: (configService: PostgresqlConfigService) => ({
        type: 'postgres',
        host: configService.host,
        port: configService.port,
        username: configService.user,
        password: configService.password,
        database: configService.database,
        synchronize: false,
        migrationsRun: configService.runMigrations,
        entities: [
          `${process.cwd()}/**/*.entity${
            environment ? '{.ts,.js}' : '{.js, .ts}'
          }`,
        ],
        migrationsTableName: 'migrations',
        migrations: [`${process.cwd()}/database/migrations/*.ts`],
        cli: {
          migrationsDir: 'src/database/migrations',
        },
      }),
      inject: [PostgresqlConfigService],
    };
  }

  static get staticConfig(): DataSourceOptions {
    const folder = !process.env.NODE_ENV ? 'src' : 'dist/src';
    return {
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
  }
}
