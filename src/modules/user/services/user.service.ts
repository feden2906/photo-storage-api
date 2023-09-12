import { Injectable } from '@nestjs/common';

import { UserEntity } from '../../../database';
import { MediaRepository } from '../../media/services/media.repository';
import { StorageService } from '../../storage/services/storage.service';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    private storageService: StorageService,
    private userRepository: UserRepository,
    private imageRepository: MediaRepository,
  ) {}

  public async currentUser(userId: string): Promise<UserEntity> {
    return await this.userRepository.findOneOrFail({
      where: { id: userId },
    });
  }

  public async deleteUser(userId: string): Promise<void> {
    const images = await this.imageRepository.findUrlsBy({
      user: { id: userId },
    });
    await Promise.all([
      ...images.map((image) => this.storageService.deleteFile(image.url)),
      this.userRepository.delete(userId),
    ]);
  }
}
