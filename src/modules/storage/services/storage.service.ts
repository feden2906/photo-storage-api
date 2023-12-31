import { Inject, Injectable } from '@nestjs/common';
import { StorageEngine } from 'multer';
import { Readable } from 'stream';

import { IStorageProviderService } from '../models/interfaces/storage-provider-service.interface';

@Injectable()
export class StorageService {
  constructor(
    @Inject('StorageProviderService')
    private readonly storageProvideService: IStorageProviderService,
  ) {}

  public async getFile(filePath: string): Promise<Readable> {
    return await this.storageProvideService.getFile(filePath);
  }

  public getMulterStorage(): StorageEngine {
    return this.storageProvideService.getMulterStorage();
  }

  public async saveFile(
    readable: Readable,
    file: Express.Multer.File,
    userId: string,
  ): Promise<string> {
    return await this.storageProvideService.saveFile(readable, file, userId);
  }

  public async deleteFile(filePath: string): Promise<void> {
    await this.storageProvideService.deleteFile(filePath);
  }
}
