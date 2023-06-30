import { ValueTransformer } from 'typeorm';

import { CryptoHelper } from '../crypto.helper';

export const passwordHashTransformer: ValueTransformer = {
  to: (entityValue?: string) => {
    if (entityValue) {
      return CryptoHelper.hashPassword(entityValue);
    }
  },
  from: (databaseValue?: string) => {
    if (databaseValue) {
      return databaseValue;
    }
  },
};
