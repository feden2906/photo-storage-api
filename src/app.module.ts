import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { I18nModule } from 'nestjs-i18n';

import { AppGateway } from './app.gateway';
import { AppConfigModule } from './config/app/config.module';
import { typeOrmConfig } from './config/database/type-orm-configuration';
import { i18nConfig } from './config/i18n/i18n-configuration';
import { AlbumModule } from './modules/album/album.module';
import { AuthModule } from './modules/auth/auth.module';
import { HealthModule } from './modules/health/health.module';
import { MediaModule } from './modules/media/media.module';
import { RepositoryModule } from './modules/repository/repository.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    AppConfigModule,
    TypeOrmModule.forRootAsync(typeOrmConfig),
    I18nModule.forRootAsync(i18nConfig),
    AuthModule,
    MediaModule,
    UserModule,
    HealthModule,
    RepositoryModule,
    AlbumModule,
  ],
  providers: [AppGateway],
})
export class AppModule {}
