import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserToAlbumsEntity1697790974406 implements MigrationInterface {
  name = 'UserToAlbumsEntity1697790974406';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "role" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "roles" jsonb NOT NULL DEFAULT '[]', "userId" uuid, "albumId" uuid, CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_to_albums" ("albumId" uuid NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "PK_6c50d8de62ef5485114c98d5fd4" PRIMARY KEY ("albumId", "userId"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "role" ADD CONSTRAINT "FK_3e02d32dd4707c91433de0390ea" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "role" ADD CONSTRAINT "FK_ea59fc87227cd5a6cc019096161" FOREIGN KEY ("albumId") REFERENCES "album"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_to_albums" ADD CONSTRAINT "FK_3e36a0e9f3bf002b14764e1b6c1" FOREIGN KEY ("albumId") REFERENCES "album"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_to_albums" ADD CONSTRAINT "FK_ca6b3c8ccb616eecd985498090d" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_to_albums" DROP CONSTRAINT "FK_ca6b3c8ccb616eecd985498090d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_to_albums" DROP CONSTRAINT "FK_3e36a0e9f3bf002b14764e1b6c1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "role" DROP CONSTRAINT "FK_ea59fc87227cd5a6cc019096161"`,
    );
    await queryRunner.query(
      `ALTER TABLE "role" DROP CONSTRAINT "FK_3e02d32dd4707c91433de0390ea"`,
    );
    await queryRunner.query(`DROP TABLE "user_to_albums"`);
    await queryRunner.query(`DROP TABLE "role"`);
  }
}
