import { Injectable } from '@nestjs/common';

import {
  EntityNotFoundException,
  NoPermissionException,
} from '../../../common/http';
import { ListEntityType } from '../../../common/types';
import { MediaEntity } from '../../../database';
import { FilesNotExistException } from '../../storage/exceptions/files-not-exist.exception';
import { StorageService } from '../../storage/services/storage.service';
import { MediaListQueryDto } from '../models/dtos/request';
import { MediaRepository } from './media.repository';

@Injectable()
export class MediaService {
  constructor(
    private storageService: StorageService,
    private mediaRepository: MediaRepository,
  ) {}

  public async getMediaList(
    query: MediaListQueryDto,
  ): Promise<ListEntityType<MediaEntity>> {
    return await this.mediaRepository.getMediaList(query);
  }

  public async uploadMediaFiles(
    mediaPaths: string[],
    userId: string,
  ): Promise<void> {
    if (!mediaPaths.length) {
      throw new FilesNotExistException();
    }

    for (const path of mediaPaths) {
      await this.mediaRepository.createImage(path, userId);
    }
    // for (const mediaFile of mediaFiles) {
    //   const stream = Readable.from(mediaFile.buffer);
    //
    //   await new Promise<void>((resolve, reject) => {
    //     stream.on('data', (chunk) => {
    //       console.log('--- chunk ---');
    //
    //       this.storageService.saveFile(chunk, mediaFile, userId);
    //     });
    //     stream.on('end', () => {
    //       console.log('--- success ---');
    //       stream.emit('close');
    //       resolve();
    //     });
    //     stream.on('error', (error) => {
    //       reject(error);
    //     });
    //   });
    // }
  }

  public async deleteMedia(userId: string, imageId: string): Promise<void> {
    const image = await this.checkAbilityToManage(userId, imageId);
    await Promise.all([
      this.storageService.deleteFile(image.url),
      this.mediaRepository.delete(imageId),
    ]);
  }

  private async checkAbilityToManage(
    userId: string,
    imageId: string,
  ): Promise<MediaEntity> {
    const [isExist, image] = await Promise.all([
      this.mediaRepository.isExist(imageId),
      this.mediaRepository.findOneByIdAndOwner(userId, imageId),
    ]);
    if (!isExist) throw new EntityNotFoundException();
    if (isExist && !image) throw new NoPermissionException();
    return image;
  }
}
