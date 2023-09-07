import { ConfigurationServiceStatic } from '../../configuration.service-static';

export class AWSConfigServiceStatic {
  static get accessKeyId(): string {
    return ConfigurationServiceStatic.get('AWS_ACCESS_KEY_ID');
  }

  static get secretAccessKey(): string {
    return ConfigurationServiceStatic.get('AWS_SECRET_ACCESS_KEY');
  }

  static get objectACL(): string {
    return ConfigurationServiceStatic.get('AWS_S3_OBJECT_ACL');
  }

  static get bucketPath(): string {
    return ConfigurationServiceStatic.get('AWS_S3_BUCKET_PATH');
  }

  static get bucketName(): string {
    return ConfigurationServiceStatic.get('AWS_S3_BUCKET_NAME');
  }

  static get endpoint(): string {
    return ConfigurationServiceStatic.get('AWS_S3_ENDPOINT');
  }
}
