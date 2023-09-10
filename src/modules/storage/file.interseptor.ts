// import { Injectable, NestInterceptor } from '@nestjs/common';
// import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
// import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
// import * as multer from 'multer';
// import * as path from 'path';
//
// @Injectable()
// export class LocalFilesInterceptor implements NestInterceptor {
//   fileInterceptor: NestInterceptor;
//
//   constructor() {
//     const multerOptions: MulterOptions = {
//       storage: multer.diskStorage({
//         destination: path.join(process.cwd(), 'temp'),
//         filename(req, file, callback) {
//           callback(null, new Date().toDateString());
//         },
//       }),
//     };
//     this.fileInterceptor = new (FilesInterceptor('files', 99, multerOptions))();
//   }
//
//   intercept(...args: Parameters<NestInterceptor['intercept']>) {
//     return this.fileInterceptor.intercept(...args);
//   }
// }
