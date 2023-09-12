import { Injectable } from '@nestjs/common';

@Injectable()
export class PathStorageService {
  private pathsStorage: string[] = [];

  public setPathsStorage(path: string) {
    this.pathsStorage.push(path);
  }

  public getPathsStorage(): string[] {
    return this.pathsStorage;
  }
}
