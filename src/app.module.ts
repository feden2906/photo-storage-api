import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { I18nModule } from 'nestjs-i18n';

import { AppGateway } from './app.gateway';
import { AppConfigModule } from './config/app/config.module';
import { PostgresqlConfigModule } from './config/database/config.module';
import { typeOrmConfig } from './config/database/type-orm-configuration';
import { i18nConfigModule } from './config/i18n/config.module';
import { i18nConfig } from './config/i18n/i18n-configuration';
import { AuthModule } from './modules/auth/auth.module';
import { HealthModule } from './modules/health/health.module';
import { MediaModule } from './modules/media/media.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    I18nModule.forRootAsync(i18nConfig),
    PostgresqlConfigModule,
    i18nConfigModule,
    AppConfigModule,
    TypeOrmModule.forRootAsync(typeOrmConfig),
    AuthModule,
    MediaModule,
    UserModule,
    HealthModule,
  ],
  controllers: [],
  providers: [AppGateway],
})
export class AppModule {}
