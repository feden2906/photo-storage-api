import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { InvalidCredentialsException } from '../../../common/http';
import { IUserData } from '../../../common/models';
import { AuthConfigService } from '../../../config/auth/configuration.service';
import { UserMapper } from '../../user/services/user.mapper';
import { UserRepository } from '../../user/services/user.repository';
import { JwtPayload } from '../models';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private userRepository: UserRepository,
    private configService: AuthConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.accessTokenSecret,
    });
  }

  async validate({ email }: JwtPayload): Promise<IUserData> {
    const user = await this.userRepository.findOneBy({ email });
    if (!user) {
      throw new InvalidCredentialsException();
    }
    return UserMapper.toUserData(user);
  }
}
