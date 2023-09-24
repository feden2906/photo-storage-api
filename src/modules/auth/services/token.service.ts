import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import {
  AccessTokenExpiredException,
  InvalidTokenException,
  RefreshTokenExpiredException,
} from '../../../common/http';
import { AuthConfigService } from '../../../config/auth/configuration.service';
import { UserRepository } from '../../repository/services/user.repository';
import { JwtPayload, TokenError, TokenType } from '../models';
import { TokenResponseDto } from '../models/dtos/response';

@Injectable()
export class TokenService {
  constructor(
    private usersRepository: UserRepository,
    private jwtService: JwtService,
    private configService: AuthConfigService,
  ) {}

  public generateAuthToken(payload: JwtPayload): TokenResponseDto {
    const accessTokenExpires = this.configService.accessTokenExpiration;
    const refreshTokenExpires = this.configService.refreshTokenExpiration;
    const accessToken = this.generateToken(
      payload,
      accessTokenExpires,
      TokenType.Access,
    );
    const refreshToken = this.generateToken(
      payload,
      refreshTokenExpires,
      TokenType.Refresh,
    );

    return {
      accessToken,
      accessTokenExpires,
      refreshToken,
      refreshTokenExpires,
    };
  }

  public generateRefreshToken(refreshToken: string): TokenResponseDto {
    const { id, email } = this.verifyToken(refreshToken, TokenType.Refresh);
    return this.generateAuthToken({ id, email });
  }

  public verifyToken(token: string, type: TokenType): JwtPayload {
    try {
      const secret = this.getSecret(type);

      return this.jwtService.verify(token, { secret });
    } catch (name) {
      const isAccessExpired =
        name === TokenError.TokenExpiredError && type === TokenType.Access;
      if (isAccessExpired) {
        throw new AccessTokenExpiredException();
      }
      const isRefreshExpired =
        name === TokenError.TokenExpiredError && type === TokenType.Refresh;
      if (isRefreshExpired) {
        throw new RefreshTokenExpiredException();
      }
      throw new InvalidTokenException();
    }
  }

  private generateToken(
    payload: JwtPayload,
    expiresIn: string,
    type: TokenType,
  ): string {
    const secret = this.getSecret(type);
    this.configService.accessTokenSecret;
    return this.jwtService.sign(payload, { expiresIn, secret });
  }

  private getSecret(type: TokenType): string {
    switch (type) {
      case TokenType.Access:
        return this.configService.accessTokenSecret;
      case TokenType.Refresh:
        return this.configService.refreshTokenSecret;
    }
  }
}
