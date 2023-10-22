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
import { RoleRepository } from '../../repository/services/role.repository';
import { UserRepository } from '../../repository/services/user.repository';
import { UserToAlbumsRepository } from '../../repository/services/user_to_albums.repository';
import {
  AlbumCreateRequestDto,
  DetachMediaFromAlbumRequestDto,
} from '../models/dtos/request';
import { AddMemberRequestDto } from '../models/dtos/request/add-member.request.dto';

@Injectable()
export class AlbumService {
  constructor(
    private mediaService: MediaService,
    private userRepository: UserRepository,
    private mediaToAlbumsRepository: MediaToAlbumsRepository,
    private userToAlbumsRepository: UserToAlbumsRepository,
    private albumRepository: AlbumRepository,
    private mediaRepository: MediaRepository,
    private roleRepository: RoleRepository,
  ) {}

  public async getListAlbum(userId: string): Promise<AlbumEntity[]> {
    return await this.albumRepository.findManyByOwnerId(userId);
  }

  public async getAlbumById(
    userId: string,
    albumId: string,
  ): Promise<AlbumEntity> {
    return await this.checkAbilityToManage(userId, albumId);
  }

  public async createAlbum(
    dto: AlbumCreateRequestDto,
    userId: string,
  ): Promise<AlbumEntity> {
    const album = await this.albumRepository.createAlbum(dto, userId);

    await this.roleRepository.save({
      album,
      user: { id: userId },
      roles: ['Owner'],
    });

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

  public async addMember(
    userId: string,
    albumId: string,
    dto: AddMemberRequestDto,
  ): Promise<void> {
    if (userId === dto.memberId) throw new ForbiddenException();

    const album = await this.checkAbilityToManage(userId, albumId);

    const member = await this.userRepository.findOneOrFail({
      where: { id: dto.memberId },
    });

    await Promise.all([
      await this.roleRepository.save({
        album,
        user: member,
        roles: [dto.role],
      }),
      await this.userToAlbumsRepository.save({ album, user: member }),
    ]);
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
