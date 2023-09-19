import { Injectable } from '@nestjs/common';

import {
  EntityNotFoundException,
  NoPermissionException,
} from '../../../common/http';
import { AlbumEntity } from '../../../database';
import { MediaService } from '../../media/services/media.service';
import {
  AlbumCreateRequestDto,
  AlbumDeleteMediaRequestDto,
  AlbumUploadMediaRequestDto,
} from '../models/dtos/request';
import { AlbumRepository } from './album.repository';

@Injectable()
export class AlbumService {
  constructor(
    private albumRepository: AlbumRepository,
    private mediaService: MediaService,
  ) {}
  public async createAlbum(
    dto: AlbumCreateRequestDto,
    userId: string,
  ): Promise<AlbumEntity> {
    return await this.albumRepository.createAlbum(dto, userId);
  }

  public async deleteAlbum(userId: string, albumId: string) {
    await this.checkAbilityToManage(userId, albumId);

    await this.albumRepository.delete(albumId);
  }

  public async deleteMedia(
    albumId: string,
    userId: string,
    dto: AlbumDeleteMediaRequestDto,
  ): Promise<void> {
    const { mediaIds } = dto;

    const album = await this.checkAbilityToManage(userId, albumId);

    for (const mediaId of mediaIds) {
      await this.mediaService.checkAbilityToManage(userId, mediaId);
    }

    for (const mediaId of mediaIds) {
      album.images = album.images.filter((image) => image.id !== mediaId);
    }

    await this.albumRepository.save(album);
  }

  public async uploadMedia(
    userId: string,
    albumId: string,
    dto: AlbumUploadMediaRequestDto,
  ): Promise<void> {
    const album = await this.checkAbilityToManage(userId, albumId);

    for (const mediaId of dto.mediaIds) {
      const media = await this.mediaService.checkAbilityToManage(
        userId,
        mediaId,
      );
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
