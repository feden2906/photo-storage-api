import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt } from 'passport-jwt';
import { Strategy } from 'passport-local';

import { InvalidCredentialsException } from '../../../common/http';
import { IUserData } from '../../../common/models';
import { AuthConfigService } from '../../../config/auth/configuration.service';
import { UserMapper } from '../../user/services/user.mapper';
import { UserRepository } from '../../user/services/user.repository';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private userRepository: UserRepository,
    private configService: AuthConfigService,
  ) {
    super({
      usernameField: 'email',
      passwordField: 'password',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.accessTokenSecret,
    });
  }

  async validate(email: string, password: string): Promise<IUserData> {
    const user = await this.userRepository.authorize(email, password);
    if (!user) {
      throw new InvalidCredentialsException();
    }
    return UserMapper.toUserData(user);
  }
}
