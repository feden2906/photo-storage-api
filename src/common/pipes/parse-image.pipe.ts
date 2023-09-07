import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

import { FileUploadHelper } from '../helpers';

@Injectable()
export class ParseMediaFiles implements PipeTransform {
  transform(files: Array<Express.Multer.File>): Express.Multer.File[] {
    if (files === undefined || files === null || files.length === 0) {
      throw new BadRequestException('Media file is required');
    }
    // if (file.size > ImageConfig.size) {
    //   throw new UnsupportedMediaTypeException(`Image is too large`);
    // }

    files.forEach((file) => FileUploadHelper.validateMimetype(file.mimetype));

    return files;
  }
}
