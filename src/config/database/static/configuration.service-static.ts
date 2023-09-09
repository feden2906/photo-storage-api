import { ConfigurationServiceStatic } from '../../configuration.service-static';

export class PostgresqlConfigServiceStatic {
  static get host(): string {
    return ConfigurationServiceStatic.get('POSTGRES_HOST');
  }

  static get port(): number {
    return Number(ConfigurationServiceStatic.get('POSTGRES_PORT'));
  }

  static get user(): string {
    return ConfigurationServiceStatic.get('POSTGRES_USER');
  }

  static get password(): string {
    return ConfigurationServiceStatic.get('POSTGRES_PASSWORD');
  }

  static get database(): string {
    return ConfigurationServiceStatic.get('POSTGRES_DATABASE');
  }

  static get runMigrations(): boolean {
    const value = ConfigurationServiceStatic.get('POSTGRES_RUN_MIGRATIONS');
    return value ? JSON.parse(value) : false;
  }
}
