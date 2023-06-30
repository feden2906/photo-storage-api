import { registerAs } from '@nestjs/config';

const configToken = 'aws';
export default registerAs(configToken, () => ({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  objectACL: process.env.AWS_S3_OBJECT_ACL,
  bucketPath: process.env.AWS_S3_BUCKET_PATH,
  bucketName: process.env.AWS_S3_BUCKET_NAME,
  endpoint: process.env.AWS_S3_ENDPOINT,
}));
