import { DataSource, QueryRunner } from 'typeorm';

export async function clearTables(dataSource: DataSource): Promise<void> {
  const queryRunner = dataSource.createQueryRunner();
  const tables = await getTableNamesForClear(queryRunner);

  await Promise.all(
    tables.map(async (name) => {
      await queryRunner.query(`DELETE FROM "${name}"`);
    }),
  );
}

async function getTableNamesForClear(
  queryRunner: QueryRunner,
): Promise<string[]> {
  const tables = (await queryRunner.query(`
    SELECT table_name as name
    FROM information_schema.tables
    WHERE table_schema = 'public'
      AND table_type = 'BASE TABLE';
  `)) as Array<{ name: string }>;

  const protectedTables = ['migrations', 'spatial_ref_sys'];

  return tables.reduce((acc, cur) => {
    if (!protectedTables.includes(cur.name)) {
      acc.push(cur.name);
    }
    return acc;
  }, []);
}
