import {
  BadRequestException,
  Injectable,
  PipeTransform,
  UnsupportedMediaTypeException,
} from '@nestjs/common';

import { ImageConfig } from '../constants';

@Injectable()
export class ParseImage implements PipeTransform {
  transform(
    file: Express.Multer.File,
  ): Express.Multer.File | Express.Multer.File[] {
    if (file === undefined || file === null) {
      throw new BadRequestException('Image is required');
    }
    if (file.size > ImageConfig.size) {
      throw new UnsupportedMediaTypeException(`Image is too large`);
    }

    return file;
  }
}
