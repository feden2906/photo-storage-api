import { MediaConfig } from '../constants';
import { FileUploadHelper } from '../helpers';
import { ApiMedia } from './api-file.decorator';

export function ApiMediaFile(fileName = 'image') {
  return ApiMedia(fileName, {
    fileFilter: FileUploadHelper.validateMimetype(...MediaConfig.mimetypes),
  });
}
