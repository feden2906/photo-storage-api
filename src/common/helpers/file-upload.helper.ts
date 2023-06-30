import { BadRequestException } from '@nestjs/common';

export class FileUploadHelper {
  static validateMimetype(...mimetypes: string[]) {
    return function (
      req,
      file: Express.Multer.File,
      callback: (error: Error | null, acceptFile: boolean) => void,
    ) {
      const hasValidMimetype = mimetypes.includes(file.mimetype);
      const error = hasValidMimetype
        ? null
        : new BadRequestException('Wrong mimetype');
      callback(error, hasValidMimetype);
    };
  }
}
