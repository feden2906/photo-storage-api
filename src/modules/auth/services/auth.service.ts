import { Injectable } from '@nestjs/common';

import { UserEntity } from '../../../database';
import { UserCreateRequestDto } from '../../user/models/dtos/request';
import { UserMapper } from '../../user/services/user.mapper';
import { UserRepository } from '../../user/services/user.repository';
import { LoginResponseDto } from '../models/dtos/response';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private tokenService: TokenService,
  ) {}

  public async login(userId: string): Promise<LoginResponseDto> {
    const user = await this.userRepository.findOneByOrFail({ id: userId });

    const token = await this.tokenService.generateAuthToken({
      id: user.id,
      email: user.email,
    });

    return { token, user: UserMapper.toResponseDto(user) };
  }

  public async signUp(dto: UserCreateRequestDto): Promise<UserEntity> {
    return await this.userRepository.save(this.userRepository.create(dto));
  }
}
