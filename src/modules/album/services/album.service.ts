import { Injectable } from '@nestjs/common';

import {
  EntityNotFoundException,
  NoPermissionException,
} from '../../../common/http';
import { AlbumEntity } from '../../../database';
import { MediaRepository } from '../../media/services/media.repository';
import { AlbumCreateRequestDto } from '../models/dtos/request';
import { AlbumUploadRequestDto } from '../models/dtos/request/album-upload.request.dto';
import { AlbumRepository } from './album.repository';

@Injectable()
export class AlbumService {
  constructor(
    private albumRepository: AlbumRepository,
    private mediaRepository: MediaRepository,
  ) {}
  public async createAlbum(
    dto: AlbumCreateRequestDto,
    userId: string,
  ): Promise<AlbumEntity> {
    return await this.albumRepository.createAlbum(dto, userId);
  }

  public async uploadMedia(
    albumId: string,
    userId: string,
    dto: AlbumUploadRequestDto,
  ): Promise<void> {
    const album = await this.checkAbilityToManage(userId, albumId);

    for (const mediaId of dto.mediaIds) {
      const media = await this.mediaRepository.findOneByIdAndOwner(
        userId,
        mediaId,
      );
      if (!media) throw new NoPermissionException();

      album.images.push(media);
    }

    await this.albumRepository.save(album);
  }

  private async checkAbilityToManage(
    userId: string,
    albumId: string,
  ): Promise<AlbumEntity> {
    const [isExist, album] = await Promise.all([
      this.albumRepository.isExist(albumId),
      this.albumRepository.findOneByIdAndOwner(userId, albumId),
    ]);
    if (!isExist) throw new EntityNotFoundException();
    if (isExist && !album) throw new NoPermissionException();
    return album;
  }
}
