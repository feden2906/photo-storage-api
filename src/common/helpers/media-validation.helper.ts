import { UnsupportedMediaTypeException } from '@nestjs/common';

import { MediaConfig } from '../constants';

export const mediaValidation = (
  req,
  file,
  callback: (error: Error | null, acceptFile: boolean) => void,
) => {
  if (!isValidMimetype(file.mimetype)) {
    return callback(
      new UnsupportedMediaTypeException('Mimetype is not valid'),
      true,
    );
  }

  return callback(null, true);
};

const isValidMimetype = (fileMimetype: string) => {
  return MediaConfig.mimetypes.includes(fileMimetype);
};
