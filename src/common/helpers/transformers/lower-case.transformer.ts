import { ValueTransformer } from 'typeorm';

export const lowerCaseTransformer: ValueTransformer = {
  to: (entityValue?: string) => {
    return entityValue?.toLowerCase();
  },
  from: (databaseValue?: string) => {
    return databaseValue;
  },
};
