import { BadRequestException } from '@nestjs/common';

export class FilesNotExistException extends BadRequestException {
  constructor() {
    super('File not exist');
  }
}
