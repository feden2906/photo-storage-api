import { PassThrough } from 'node:stream';

import { Injectable } from '@nestjs/common';

import {
  EntityNotFoundException,
  NoPermissionException,
} from '../../../common/http';
import { ListEntityType } from '../../../common/types';
import { ImageEntity } from '../../../database';
import { StorageService } from '../../storage/services/storage.service';
import { MediaListQueryDto } from '../models/dtos/request';
import { MediaRepository } from './media.repository';

@Injectable()
export class MediaService {
  constructor(
    private storageService: StorageService,
    private imageRepository: MediaRepository,
  ) {}

  public async getImageList(
    query: MediaListQueryDto,
  ): Promise<ListEntityType<ImageEntity>> {
    return await this.imageRepository.getImageList(query);
  }

  public async uploadMediaFiles(
    mediaFiles: Array<Express.Multer.File>,
    userId: string,
  ): Promise<void> {
    mediaFiles.map(async (mediaFile) => {
      const fileStream = new PassThrough();
      fileStream.end(mediaFile.buffer);

      await this.storageService.upload(fileStream, mediaFile, userId);
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
