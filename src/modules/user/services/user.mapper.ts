import { IUserData } from '../../../common/models';
import { UserEntity } from '../../../database';
import { UserResponseDto } from '../models/dtos/response';

export class UserMapper {
  public static toResponseDto(entity: UserEntity): UserResponseDto {
    return {
      id: entity.id,
      firstName: entity.firstName,
      lastName: entity.lastName,
      email: entity.email,
    };
  }

  public static toUserData(entity: UserEntity): IUserData {
    return {
      userId: entity.id,
      email: entity.email,
    };
  }
}
