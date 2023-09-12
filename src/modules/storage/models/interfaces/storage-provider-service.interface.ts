import { StorageEngine } from 'multer';
import { Readable } from 'stream';

export abstract class IStorageProviderService {
  abstract getMulterStorage(): StorageEngine;

  abstract getFile(filePath: string): Promise<Readable>;

  abstract saveFile(
    readable: Readable,
    file: Express.Multer.File,
    userId: string,
  ): Promise<string>;

  abstract deleteFile(filePath: string): Promise<void>;
}
