import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

import configuration from './configuration';

@Injectable()
export class AppConfigService {
  constructor(
    @Inject(configuration.KEY)
    private appConfiguration: ConfigType<typeof configuration>,
  ) {}

  get environment(): string {
    return this.appConfiguration.environment;
  }

  get port(): number {
    return Number(this.appConfiguration.port);
  }

  get hostname(): string {
    return this.appConfiguration.hostname;
  }
}
