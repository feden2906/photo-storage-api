import { Injectable } from '@nestjs/common';

import {
  EntityNotFoundException,
  NoPermissionException,
} from '../../../common/http';
import { ListEntityType } from '../../../common/types';
import { ImageEntity } from '../../../database';
import { StorageService } from '../../storage/services/storage.service';
import { ImageListQueryDto } from '../models/dtos/request';
import { ImageRepository } from './image.repository';

@Injectable()
export class ImageService {
  constructor(
    private storageService: StorageService,
    private imageRepository: ImageRepository,
  ) {}

  public async getImageList(
    query: ImageListQueryDto,
  ): Promise<ListEntityType<ImageEntity>> {
    return await this.imageRepository.getImageList(query);
  }

  public async uploadFiles(
    files: Array<Express.Multer.File>,
    userId: string,
  ): Promise<void> {
    files.forEach((file) => {
      file.stream;
      this.storageService.upload(file, userId);
    });
  }

  public async deleteImage(userId: string, imageId: string): Promise<void> {
    const image = await this.checkAbilityToManage(userId, imageId);
    await Promise.all([
      this.storageService.delete(image.url),
      this.imageRepository.delete(imageId),
    ]);
  }

  private async checkAbilityToManage(
    userId: string,
    imageId: string,
  ): Promise<ImageEntity> {
    const [isExist, image] = await Promise.all([
      this.imageRepository.isExist(imageId),
      this.imageRepository.findOneByIdAndOwner(userId, imageId),
    ]);
    if (!isExist) throw new EntityNotFoundException();
    if (isExist && !image) throw new NoPermissionException();
    return image;
  }
}
