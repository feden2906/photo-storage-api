/* eslint no-console: 0 */
import { CreateBucketCommand, S3Client } from '@aws-sdk/client-s3';

import { AWSConfigServiceStatic } from '../config/aws/static/configuration.service-static';

const client = new S3Client({
  credentials: {
    accessKeyId: AWSConfigServiceStatic.accessKeyId,
    secretAccessKey: AWSConfigServiceStatic.secretAccessKey,
  },
  endpoint: AWSConfigServiceStatic.endpoint,
  forcePathStyle: true,
});

async function createBucket() {
  try {
    const command = new CreateBucketCommand({
      Bucket: AWSConfigServiceStatic.bucketName,
      ACL: AWSConfigServiceStatic.objectACL,
    });
    await client.send(command);
    console.log(`Create default bucket -> done`);
  } catch (err) {
    if (err && err.Code !== 'BucketAlreadyOwnedByYou') {
      console.log(err.stack);
      throw err;
    }
    console.warn(`Default bucket is exist`);
  }
}

void createBucket();
