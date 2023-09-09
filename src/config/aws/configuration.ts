import { ConfigService, registerAs } from '@nestjs/config';

const configService = new ConfigService();
const configToken = 'aws';
export default registerAs(configToken, () => ({
  accessKeyId: configService.get<string>('AWS_ACCESS_KEY_ID'),
  secretAccessKey: configService.get<string>('AWS_SECRET_ACCESS_KEY'),
  objectACL: configService.get<string>('AWS_S3_OBJECT_ACL'),
  bucketPath: configService.get<string>('AWS_S3_BUCKET_PATH'),
  bucketName: configService.get<string>('AWS_S3_BUCKET_NAME'),
  endpoint: configService.get<string>('AWS_S3_ENDPOINT'),
}));
