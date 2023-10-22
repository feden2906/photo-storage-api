import { ForbiddenException, Injectable } from '@nestjs/common';
import CombinedStream from 'combined-stream';

import {
  EntityNotFoundException,
  NoPermissionException,
} from '../../../common/http';
import { ListEntityType } from '../../../common/types';
import { MediaEntity } from '../../../database';
import { MediaRepository } from '../../repository/services/media.repository';
import { FilesNotExistException } from '../../storage/exceptions/files-not-exist.exception';
import { StorageService } from '../../storage/services/storage.service';
import { MediaListQueryDto } from '../models/dtos/request';

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

  public async getMediaStreams(
    query: MediaListQueryDto,
  ): Promise<CombinedStream> {
    const combinedStream = CombinedStream.create();

    const { data: mediaList } = await this.mediaRepository.getMediaList(query);

    for (const media of mediaList) {
      combinedStream.append(await this.storageService.getFile(media.url));
    }

    return combinedStream;
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

  public async checkAbilityToManage(
    userId: string,
    mediaId: string,
  ): Promise<MediaEntity> {
    const [isExist, media] = await Promise.all([
      this.mediaRepository.isExist(mediaId),
      this.mediaRepository.findOneByIdAndOwner(userId, mediaId),
    ]);
    if (!isExist) throw new EntityNotFoundException();
    if (isExist && !media) throw new NoPermissionException();
    return media;
  }

  public async check(userId: string, mediaIds: string[]) {
    const mediaList = await this.mediaRepository.findManyByIdsAndOwner(
      userId,
      mediaIds,
    );
    if (mediaList.length !== mediaIds.length) {
      throw new ForbiddenException();
    }
    return mediaIds;
  }
}
