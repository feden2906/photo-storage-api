import { Controller, Delete, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { ApiGlobalResponse, CurrentUser } from '../../common/decorators';
import { IUserData } from '../../common/models';
import { UserResponseDto } from './models/dtos/response';
import { UserMapper } from './services/user.mapper';
import { UserService } from './services/user.service';

@ApiBearerAuth()
@ApiTags('User')
@Controller({ path: 'users', version: '1' })
export class UserController {
  constructor(private usersService: UserService) {}

  @ApiOperation({ description: 'Get current user by token' })
  @ApiGlobalResponse(UserResponseDto)
  @Get('me')
  public async getCurrentUser(
    @CurrentUser() user: IUserData,
  ): Promise<UserResponseDto> {
    const result = await this.usersService.currentUser(user.userId);
    return UserMapper.toResponseDto(result);
  }

  @ApiOperation({ description: 'Delete my profile' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('me')
  public async deleteUser(@CurrentUser() user: IUserData): Promise<void> {
    await this.usersService.deleteUser(user.userId);
  }
}
