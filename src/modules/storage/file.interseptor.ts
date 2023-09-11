import { S3Client } from '@aws-sdk/client-s3';
import { Injectable, NestInterceptor } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import * as multerS3 from 'multer-s3';

@Injectable()
export class LocalFilesInterceptor implements NestInterceptor {
  private readonly client: S3Client;
  constructor() {
    this.client = new S3Client({
      credentials: {
        accessKeyId: 'user',
        secretAccessKey: 'password',
      },
      endpoint: 'http://localhost:7000',
      forcePathStyle: true,
    });
  }
  intercept(...args: Parameters<NestInterceptor['intercept']>) {
    const fileInterceptor = new (FilesInterceptor('files', 99, {
      storage: multerS3({
        s3: this.client,
        bucket: 'photo-storage',
        key: function (req, file, cb) {
          cb(null, file.originalname);
        },
        // shouldTransform: function (req, file, cb) {
        //   cb(null, /^image/i.test(file.mimetype));
        // },
        // transforms: [
        //   {
        //     id: 'original',
        //     key: function (req, file, cb) {
        //       cb(null, file.originalname);
        //     },
        //     transform: (req, file, cb) => {
        //       // track progress of upload
        //       const progress = { loaded: 0, total: 0 };
        //       const params = { Bucket: 'photo-storage', Body: file.stream };
        //       const upload = this.client.send();
        //
        //       upload.on('httpUploadProgress', function (evt) {
        //         progress.loaded = evt.loaded;
        //         progress.total = evt.total;
        //       });
        //
        //       cb(null, upload, file.mimetype);
        //     },
        //   },
        // ],
      }),
    }))();

    return fileInterceptor.intercept(...args);
  }
}
