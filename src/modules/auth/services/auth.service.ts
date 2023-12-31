import { Injectable } from '@nestjs/common';

import { UserRepository } from '../../repository/services/user.repository';
import { UserCreateRequestDto } from '../../user/models/dtos/request';
import { UserMapper } from '../../user/services/user.mapper';
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

    const token = this.tokenService.generateAuthToken({
      id: user.id,
      email: user.email,
    });

    return { token, user: UserMapper.toResponseDto(user) };
  }

  public async signUp(dto: UserCreateRequestDto): Promise<LoginResponseDto> {
    const user = await this.userRepository.save(
      this.userRepository.create(dto),
    );

    const token = this.tokenService.generateAuthToken({
      id: user.id,
      email: user.email,
    });

    return { token, user: UserMapper.toResponseDto(user) };
  }
}
