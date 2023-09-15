import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddFieldToAlbum1694762745196 implements MigrationInterface {
  name = 'AddFieldToAlbum1694762745196';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "album" ADD "name" text NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "album" DROP COLUMN "name"`);
  }
}
