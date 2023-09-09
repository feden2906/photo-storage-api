import { Logger } from '@nestjs/common';

import { LoggerContextEnum } from '../../../common/models';

export class SeedLogger extends Logger {
  private static context = LoggerContextEnum.seed;

  public static start(tableName: string): void {
    this.log(`Started creating seed for table: "${tableName}"`, this.context);
  }

  public static end(tableName: string): void {
    this.log(
      `Seed successfully created for table: "${tableName}"`,
      this.context,
    );
  }
}
