import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

import configuration from './configuration';

@Injectable()
export class AWSConfigService {
  constructor(
    @Inject(configuration.KEY)
    private awsConfiguration: ConfigType<typeof configuration>,
  ) {}

  get accessKeyId(): string {
    return this.awsConfiguration.accessKeyId;
  }

  get secretAccessKey(): string {
    return this.awsConfiguration.secretAccessKey;
  }

  get objectACL(): string {
    return this.awsConfiguration.objectACL;
  }

  get bucketPath(): string {
    return this.awsConfiguration.bucketPath;
  }

  get bucketName(): string {
    return this.awsConfiguration.bucketName;
  }

  get endpoint(): string {
    return this.awsConfiguration.endpoint;
  }
}
