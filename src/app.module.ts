import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppConfigModule } from './config/app/config.module';
import { PostgresqlConfigModule } from './config/database/config.module';
import { typeOrmConfig } from './config/database/type-orm-configuration';
import { AuthModule } from './modules/auth/auth.module';
import { HealthModule } from './modules/health/health.module';
import { ImageModule } from './modules/image/image.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    PostgresqlConfigModule,
    AppConfigModule,
    TypeOrmModule.forRootAsync(typeOrmConfig),
    AuthModule,
    ImageModule,
    UserModule,
    HealthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
