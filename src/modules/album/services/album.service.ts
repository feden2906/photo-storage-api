import { ForbiddenException, Injectable } from '@nestjs/common';
import { In } from 'typeorm';

import {
  EntityNotFoundException,
  NoPermissionException,
} from '../../../common/http';
import { AlbumEntity } from '../../../database';
import { MediaService } from '../../media/services/media.service';
import { AlbumRepository } from '../../repository/services/album.repository';
import { MediaRepository } from '../../repository/services/media.repository';
import { MediaToAlbumsRepository } from '../../repository/services/media_to_albums.repository';
import {
  AlbumCreateRequestDto,
  DetachMediaFromAlbumRequestDto,
} from '../models/dtos/request';

@Injectable()
export class AlbumService {
  constructor(
    private mediaToAlbumsRepository: MediaToAlbumsRepository,
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

  public async attachMedia(
    userId: string,
    albumId: string,
    dto: DetachMediaFromAlbumRequestDto,
  ): Promise<void> {
    const album = await this.checkAbilityToManage(userId, albumId);

    const mediaList = await this.mediaRepository.findManyByIdsAndOwner(
      userId,
      dto.mediaIds,
    );

    if (mediaList.length !== dto.mediaIds.length) {
      throw new ForbiddenException();
    }

    if (!album.title_image) {
      const title_image = mediaList.find(
        (media) => media.id === dto.mediaIds[0],
      );

      await this.albumRepository.save({
        id: albumId,
        title_image,
      });
    }

    const mediaToAlbums = mediaList.map((media) => ({ album, media }));

    await this.mediaToAlbumsRepository.save(mediaToAlbums);
  }

  public async detachMedia(
    albumId: string,
    userId: string,
    dto: DetachMediaFromAlbumRequestDto,
  ): Promise<void> {
    const album = await this.checkAbilityToManage(userId, albumId);

    if (dto.mediaIds.includes(album.title_image?.id)) {
      const media = await this.mediaRepository.findOneByMediaIdsNotInAndAlbumId(
        dto.mediaIds,
        albumId,
      );

      if (!media) {
        await this.albumRepository.save({ id: albumId, title_image: null });
      }
    }

    const mediaList =
      await this.mediaToAlbumsRepository.findManyByUserAndAlbumAndMedia(
        userId,
        albumId,
        dto.mediaIds,
      );

    if (mediaList.length !== dto.mediaIds.length) {
      throw new ForbiddenException();
    }

    await this.mediaToAlbumsRepository.delete({
      media: { id: In(dto.mediaIds) },
    });
  }

  public async attachTitleImage(
    userId: string,
    albumId: string,
    mediaId: string,
  ) {
    await this.checkAbilityToManage(userId, albumId);

    const media = await this.mediaRepository.findOneByIdAndOwnerIdAndAlbumId(
      mediaId,
      userId,
      albumId,
    );

    if (!media) throw new NoPermissionException();

    await this.albumRepository.save({ id: albumId, title_image: media });
  }

  public async detachTitleImage(userId: string, albumId: string) {
    await this.checkAbilityToManage(userId, albumId);

    await this.albumRepository.save({ id: albumId, title_image: null });
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
