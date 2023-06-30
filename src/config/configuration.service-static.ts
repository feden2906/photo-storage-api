import * as dotenv from 'dotenv';

export class ConfigurationService {
  constructor(private env: { [k: string]: string | undefined }) {}

  public get(key: string): string {
    return process.env[key] || this.env[key];
  }
}

const environment = process.env.NODE_ENV ? process.env.NODE_ENV : '';
dotenv.config({ path: `environments/${environment}.env` });
const ConfigurationServiceStatic = new ConfigurationService(process.env);
export { ConfigurationServiceStatic };
