import {
  ConflictException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { In } from 'typeorm';
import { FindOptionsRelations } from 'typeorm/find-options/FindOptionsRelations';

import {
  EntityNotFoundException,
  NoPermissionException,
} from '../../../common/http';
import { IUserData } from '../../../common/models';
import { AlbumEntity } from '../../../database';
import { MediaService } from '../../media/services/media.service';
import { AlbumRepository } from '../../repository/services/album.repository';
import { MediaRepository } from '../../repository/services/media.repository';
import { MediaToAlbumRepository } from '../../repository/services/media_to_album.repository';
import { UserRepository } from '../../repository/services/user.repository';
import { UserToAlbumRepository } from '../../repository/services/user_to_album.repository';
import {
  AlbumCreateRequestDto,
  DetachMediaFromAlbumRequestDto,
} from '../models/dtos/request';
import { AddMemberRequestDto } from '../models/dtos/request/add-member.request.dto';
import { EAlbumRole } from '../models/enums';

@Injectable()
export class AlbumService {
  constructor(
    private mediaService: MediaService,
    private userRepository: UserRepository,
    private mediaToAlbumRepository: MediaToAlbumRepository,
    private userToAlbumRepository: UserToAlbumRepository,
    private albumRepository: AlbumRepository,
    private mediaRepository: MediaRepository,
  ) {}

  public async getListAlbum(userId: string): Promise<AlbumEntity[]> {
    return await this.albumRepository.findManyByOwnerId(userId);
  }

  public async getAlbumById(
    userId: string,
    albumId: string,
  ): Promise<AlbumEntity> {
    return await this.getByIdAndCheckExist(albumId);
  }

  public async createAlbum(
    userId: string,
    dto: AlbumCreateRequestDto,
  ): Promise<AlbumEntity> {
    const album = await this.albumRepository.createAlbum(dto);

    await this.userToAlbumRepository.save(
      this.userToAlbumRepository.create({
        album,
        userId,
        role: EAlbumRole.ADMIN,
      }),
    );

    return album;
  }

  public async deleteAlbum(albumId: string) {
    await this.getByIdAndCheckExist(albumId);

    await this.albumRepository.delete(albumId);
  }

  public async attachMedia(
    userId: string,
    albumId: string,
    dto: DetachMediaFromAlbumRequestDto,
  ): Promise<void> {
    const album = await this.getByIdAndCheckExist(albumId);

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

    await this.mediaToAlbumRepository.save(mediaToAlbums);
  }

  public async detachMedia(
    albumId: string,
    userId: string,
    dto: DetachMediaFromAlbumRequestDto,
  ): Promise<void> {
    const album = await this.getByIdAndCheckExist(albumId, {
      title_image: true,
    });

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
      await this.mediaToAlbumRepository.findManyByUserAndAlbumAndMedia(
        userId,
        albumId,
        dto.mediaIds,
      );

    if (mediaList.length !== dto.mediaIds.length) {
      throw new ForbiddenException();
    }

    await this.mediaToAlbumRepository.delete({
      media: { id: In(dto.mediaIds) },
    });
  }

  public async attachTitleImage(
    userId: string,
    albumId: string,
    mediaId: string,
  ) {
    await this.getByIdAndCheckExist(albumId);

    const media = await this.mediaRepository.findOneByIdAndOwnerIdAndAlbumId(
      mediaId,
      userId,
      albumId,
    );

    if (!media) throw new NoPermissionException();

    await this.albumRepository.save({ id: albumId, title_image: media });
  }

  public async detachTitleImage(userId: string, albumId: string) {
    await this.getByIdAndCheckExist(albumId);

    await this.albumRepository.save({ id: albumId, title_image: null });
  }

  public async addMember(
    userData: IUserData,
    albumId: string,
    dto: AddMemberRequestDto,
  ): Promise<void> {
    if (userData.email === dto.memberEmail) throw new ConflictException();

    const album = await this.getByIdAndCheckExist(albumId);

    const member = await this.userRepository.findOneByOrFail({
      email: dto.memberEmail,
    });

    await this.userToAlbumRepository.save(
      this.userToAlbumRepository.create({
        album,
        user: member,
        role: dto.role,
      }),
    );
  }

  public async detachMember(
    ownerId: string,
    memberId: string,
    albumId: string,
  ) {
    if (ownerId === memberId) throw new ConflictException();

    await this.userToAlbumRepository.delete({ userId: memberId, albumId });
  }

  private async getByIdAndCheckExist(
    albumId: string,
    relations?: FindOptionsRelations<AlbumEntity>,
  ): Promise<AlbumEntity> {
    const album = await this.albumRepository.findOneByIdAndUserIdWithRelations(
      albumId,
      relations,
    );

    if (!album) throw new EntityNotFoundException();

    return album;
  }
}
