import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppConfigModule } from './config/app/config.module';
import { TypeOrmConfigurations } from './config/database/type-orm-configuration';
import { AuthModule } from './modules/auth/auth.module';
import { HealthModule } from './modules/health/health.module';
import { MediaModule } from './modules/image/media.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    AppConfigModule,
    TypeOrmModule.forRootAsync(TypeOrmConfigurations.config),
    AuthModule,
    MediaModule,
    UserModule,
    HealthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
