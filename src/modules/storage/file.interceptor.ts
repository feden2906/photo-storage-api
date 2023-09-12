import { Inject, Injectable, NestInterceptor } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';

import { mediaValidation } from '../../common/helpers';
import { AWSConfigService } from '../../config/aws/configuration.service';
import { ICustomRequest } from './models/interfaces/custom-request.type';
import { StorageService } from './services/storage.service';

@Injectable()
export class LocalFilesInterceptor implements NestInterceptor {
  constructor(
    private awsConfig: AWSConfigService,
    @Inject('StorageProviderService')
    private readonly storageService: StorageService,
  ) {}
  intercept(...args: Parameters<NestInterceptor['intercept']>) {
    const [context] = args;
    const request: ICustomRequest = context.switchToHttp().getRequest();

    request.paths = [];

    const fileInterceptor = new (FilesInterceptor('files', 99, {
      storage: this.storageService.getMulterStorage(),
      fileFilter: mediaValidation,
    }))();

    return fileInterceptor.intercept(...args);
  }
}
