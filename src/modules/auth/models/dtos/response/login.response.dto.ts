import { UserResponseDto } from '../../../../user/models/dtos/response';
import { TokenResponseDto } from './token.response.dto';

export class LoginResponseDto {
  token: TokenResponseDto;

  user: UserResponseDto;
}
