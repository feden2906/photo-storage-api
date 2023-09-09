import * as path from 'node:path';

import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { S3ClientConfig } from '@aws-sdk/client-s3/dist-types/S3Client';
import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';

import { AWSConfigService } from '../../../config/aws/configuration.service';

@Injectable()
export class StorageService {
  constructor(private awsConfig: AWSConfigService) {}

  private getS3Client(): S3Client {
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
    return new S3Client(configuration);
  }

  public async upload(
    file: Express.Multer.File,
    userId: string,
  ): Promise<string> {
    const filePath = this.buildPath(file.originalname, userId);
    await this.getS3Client().send(
      new PutObjectCommand({
        Bucket: this.awsConfig.bucketName,
        Key: filePath,
        Body: file.buffer,
        ContentType: file.mimetype,
        ACL: this.awsConfig.objectACL,
        ContentLength: file.size,
      }),
    );

    return filePath;
  }

  public async delete(filePath: string): Promise<void> {
    await this.getS3Client().send(
      new DeleteObjectCommand({
        Bucket: this.awsConfig.bucketName,
        Key: filePath,
      }),
    );
  }

  public buildPath(fileName: string, userId: string): string {
    return `users/${userId}/${v4()}${path.extname(fileName)}`;
  }
}
