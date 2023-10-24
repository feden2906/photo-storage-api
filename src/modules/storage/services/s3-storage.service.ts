import * as path from 'node:path';

import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { S3ClientConfig } from '@aws-sdk/client-s3/dist-types/S3Client';
import { Injectable } from '@nestjs/common';
import { StorageEngine } from 'multer';
import multerS3 from 'multer-s3';
import { Readable } from 'stream';
import { v4 } from 'uuid';

import { IUserData } from '../../../common/models';
import { AWSConfigService } from '../../../config/aws/configuration.service';
import { ICustomRequest } from '../models/interfaces/custom-request.type';
import { IStorageProviderService } from '../models/interfaces/storage-provider-service.interface';

@Injectable()
export class S3StorageService implements IStorageProviderService {
  private readonly client: S3Client;
  constructor(private awsConfig: AWSConfigService) {
    const configuration: S3ClientConfig = {
      credentials: {
        accessKeyId: this.awsConfig.accessKeyId,
        secretAccessKey: this.awsConfig.secretAccessKey,
      },
    };
    const endpoint = this.awsConfig.endpoint;
    if (endpoint) {
      configuration.endpoint = endpoint;
      configuration.forcePathStyle = true;
    }
    this.client = new S3Client(configuration);
  }

  public async getFile(filePath: string): Promise<Readable> {
    const { Body } = await this.client.send(
      new GetObjectCommand({
        Bucket: this.awsConfig.bucketName,
        Key: filePath,
      }),
    );
    return Body as Readable;
  }

  public async saveFile(
    readable: Readable,
    file: Express.Multer.File,
    userId: string,
  ): Promise<string> {
    const filePath = this.buildPath(file.originalname, userId);
    await this.client.send(
      new PutObjectCommand({
        Bucket: this.awsConfig.bucketName,
        Key: filePath,
        Body: readable,
        ContentType: file.mimetype,
        ACL: this.awsConfig.objectACL,
        ContentLength: file.size,
      }),
    );
    return filePath;
  }

  public async deleteFile(filePath: string): Promise<void> {
    await this.client.send(
      new DeleteObjectCommand({
        Bucket: this.awsConfig.bucketName,
        Key: filePath,
      }),
    );
  }

  public getMulterStorage(): StorageEngine {
    return multerS3({
      s3: this.client,
      bucket: this.awsConfig.bucketName,
      metadata: function (req, file, cb) {
        cb(null, { fieldName: file.fieldname });
      },
      key: (req: ICustomRequest, file, cb) => {
        const user = req.user as IUserData;
        const path = this.buildPath(file.originalname, user.userId);
        req.paths.push(path);

        cb(null, path);
      },
    });
  }

  private buildPath(fileName: string, userId: string): string {
    return `users/${userId}/${v4()}${path.extname(fileName)}`;
  }
}
