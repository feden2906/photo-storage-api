import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DataSource } from 'typeorm';

import { clearTables } from './helpers/clear-tables';
import { SeedModule } from './modules/seed.module';
import { UserSeedService } from './modules/user/user-seed.service';

async function runSeed(app: INestApplication): Promise<void> {
  // run each seed
  await Promise.all([app.get(UserSeedService).run()]);
}

async function runner(): Promise<void> {
  const app = await NestFactory.create(SeedModule);

  await clearTables(app.get(DataSource));
  await runSeed(app);

  await app.close();
}

void runner();
