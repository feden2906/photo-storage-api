import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeFields1695109740151 implements MigrationInterface {
  name = 'ChangeFields1695109740151';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "media_albums_album" DROP CONSTRAINT "FK_fd9fb4c53678b549e2893b31925"`,
    );
    await queryRunner.query(
      `ALTER TABLE "media_albums_album" ADD CONSTRAINT "FK_fd9fb4c53678b549e2893b31925" FOREIGN KEY ("albumId") REFERENCES "album"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "media_albums_album" DROP CONSTRAINT "FK_fd9fb4c53678b549e2893b31925"`,
    );
    await queryRunner.query(
      `ALTER TABLE "media_albums_album" ADD CONSTRAINT "FK_fd9fb4c53678b549e2893b31925" FOREIGN KEY ("albumId") REFERENCES "album"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
