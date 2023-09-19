import { ForbiddenException, Injectable } from '@nestjs/common';
import { In } from 'typeorm';

import {
  EntityNotFoundException,
  NoPermissionException,
} from '../../../common/http';
import { AlbumEntity } from '../../../database';
import { MediaRepository } from '../../media/services/media.repository';
import { MediaService } from '../../media/services/media.service';
import {
  AlbumCreateRequestDto,
  MediaRemoveFromAlbumRequestDto,
} from '../models/dtos/request';
import { AlbumRepository } from './album.repository';

@Injectable()
export class AlbumService {
  constructor(
    private albumRepository: AlbumRepository,
    private mediaService: MediaService,
    private mediaRepository: MediaRepository,
  ) {}

  public async getListAlbum(userId: string): Promise<AlbumEntity[]> {
    return await this.albumRepository.findManyByOwnerId(userId);
  }

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

  public async removeMedia(
    albumId: string,
    userId: string,
    dto: MediaRemoveFromAlbumRequestDto,
  ): Promise<void> {
    const { mediaIds } = dto;

    const album = await this.checkAbilityToManage(userId, albumId);

    const mediaEntities = await this.mediaRepository.findBy({
      user: { id: userId },
      id: In(mediaIds),
    });

    if (mediaEntities.length !== mediaIds.length) {
      throw new ForbiddenException();
    }

    for (const mediaId of mediaIds) {
      album.media = album.media.filter((image) => image.id !== mediaId);
    }

    await this.albumRepository.save(album);
  }

  public async addMedia(
    userId: string,
    albumId: string,
    dto: MediaRemoveFromAlbumRequestDto,
  ): Promise<void> {
    const album = await this.checkAbilityToManage(userId, albumId);

    // for (const mediaId of dto.mediaIds) {
    //   const media = await this.mediaService.checkAbilityToManage(
    //     userId,
    //     mediaId,
    //   );
    //   album.media.push(media);
    // }

    const mediaEntities = await this.mediaRepository.findBy({
      user: { id: userId },
      id: In(dto.mediaIds),
    });

    if (mediaEntities.length !== dto.mediaIds.length) {
      throw new ForbiddenException();
    }

    album.media.push(...mediaEntities);

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
