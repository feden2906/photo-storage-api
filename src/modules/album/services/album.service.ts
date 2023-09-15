import { Injectable } from '@nestjs/common';

import { AlbumEntity } from '../../../database';
import { AlbumCreateRequestDto } from '../models/dtos/request';
import { AlbumRepository } from './album.repository';

@Injectable()
export class AlbumService {
  constructor(private albumRepository: AlbumRepository) {}
  public async createAlbum(
    dto: AlbumCreateRequestDto,
    userId: string,
  ): Promise<AlbumEntity> {
    return await this.albumRepository.createAlbum(dto, userId);
  }
}
