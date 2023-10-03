import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthConfigModule } from '../../config/auth/config.module';
import { AuthConfigService } from '../../config/auth/configuration.service';
import { AuthController } from './auth.controller';
import { JwtAuthGuard } from './guards';
import { AuthService } from './services/auth.service';
import { TokenService } from './services/token.service';
import { JwtStrategy, LocalStrategy } from './strategies';

const JwtFactory = (config: AuthConfigService) => ({
  secret: config.accessTokenSecret,
  signOptions: {
    expiresIn: config.accessTokenExpiration,
  },
});

const JwtRegistrationOptions = {
  imports: [AuthConfigModule],
  useFactory: JwtFactory,
  inject: [AuthConfigService],
};

const AppGuardProvider = {
  provide: APP_GUARD,
  useClass: JwtAuthGuard,
};

@Module({
  imports: [
    AuthConfigModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync(JwtRegistrationOptions),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    LocalStrategy,
    TokenService,
    AppGuardProvider,
  ],
})
export class AuthModule {}
