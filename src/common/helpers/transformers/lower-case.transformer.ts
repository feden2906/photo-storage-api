import { ValueTransformer } from 'typeorm';

export const lowerCaseTransformer: ValueTransformer = {
  to: (entityValue?: string): string => {
    return entityValue?.toLowerCase();
  },
  from: (databaseValue?: string): string => {
    return databaseValue;
  },
};
