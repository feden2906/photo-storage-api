import { MediaFileConfig } from '../constants';
import { FileUploadHelper } from '../helpers';
import { ApiFile } from './api-file.decorator';

export function ApiImageFile(fileName = 'image') {
  return ApiFile(fileName, {
    fileFilter: FileUploadHelper.validateMimetype(...MediaFileConfig.mimetypes),
  });
}
