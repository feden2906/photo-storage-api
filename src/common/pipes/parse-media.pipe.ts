import {
  BadRequestException,
  Injectable,
  PipeTransform,
  UnsupportedMediaTypeException,
} from '@nestjs/common';

import { MediaConfig } from '../constants';

@Injectable()
export class ParseMediaFiles implements PipeTransform {
  transform(files: Array<Express.Multer.File>): Express.Multer.File[] {
    if (files === undefined || files === null || files.length === 0) {
      throw new BadRequestException('Media file is required');
    }

    files.forEach((file) => {
      const isValid = this.isValidMimetype(
        MediaConfig.mimetypes,
        file.mimetype,
      );

      if (!isValid)
        throw new UnsupportedMediaTypeException('Mimetype is not valid');
    });

    return files;
  }

  private isValidMimetype(mimetypes, fileMimetype: string): boolean {
    return mimetypes.includes(fileMimetype);
  }
}
