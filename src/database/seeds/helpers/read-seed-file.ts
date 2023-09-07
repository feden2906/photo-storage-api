import * as fs from 'fs/promises';
import * as path from 'path';

export async function readSeedFile<T>(modulePath: string): Promise<T[]> {
  const files = await fs.readdir(modulePath);
  const file = files.find((file) => file.endsWith('.seed.json'));
  if (!file) {
    throw new Error(`Seed not found in directory: ${modulePath}`);
  }
  const data = await fs.readFile(path.join(modulePath, file), 'utf-8');
  return JSON.parse(data) as T[];
}
