export class CreateSeedError extends Error {
  constructor(tableName: string) {
    super(`Creating seed for table: "${tableName}" failed`);
  }
}
