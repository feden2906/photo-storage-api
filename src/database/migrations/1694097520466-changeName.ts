import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeName1694097520466 implements MigrationInterface {
  name = 'ChangeName1694097520466';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "album" DROP CONSTRAINT "FK_eb9a227f564b6c4e85fb296dbdd"`,
    );
    await queryRunner.query(
      `CREATE TABLE "media" ("created" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "updated" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "url" text NOT NULL, "userId" uuid, CONSTRAINT "PK_f4e0fcac36e050de337b670d8bd" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "media_albums_album" ("mediaId" uuid NOT NULL, "albumId" uuid NOT NULL, CONSTRAINT "PK_f7981fe808ea7096b81a5457020" PRIMARY KEY ("mediaId", "albumId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_18051f05789d2436279d60486b" ON "media_albums_album" ("mediaId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_fd9fb4c53678b549e2893b3192" ON "media_albums_album" ("albumId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "media" ADD CONSTRAINT "FK_0db866835bf356d896e1892635d" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "album" ADD CONSTRAINT "FK_eb9a227f564b6c4e85fb296dbdd" FOREIGN KEY ("titleImageId") REFERENCES "media"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "media_albums_album" ADD CONSTRAINT "FK_18051f05789d2436279d60486b6" FOREIGN KEY ("mediaId") REFERENCES "media"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "media_albums_album" ADD CONSTRAINT "FK_fd9fb4c53678b549e2893b31925" FOREIGN KEY ("albumId") REFERENCES "album"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "media_albums_album" DROP CONSTRAINT "FK_fd9fb4c53678b549e2893b31925"`,
    );
    await queryRunner.query(
      `ALTER TABLE "media_albums_album" DROP CONSTRAINT "FK_18051f05789d2436279d60486b6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "album" DROP CONSTRAINT "FK_eb9a227f564b6c4e85fb296dbdd"`,
    );
    await queryRunner.query(
      `ALTER TABLE "media" DROP CONSTRAINT "FK_0db866835bf356d896e1892635d"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_fd9fb4c53678b549e2893b3192"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_18051f05789d2436279d60486b"`,
    );
    await queryRunner.query(`DROP TABLE "media_albums_album"`);
    await queryRunner.query(`DROP TABLE "media"`);
    await queryRunner.query(
      `ALTER TABLE "album" ADD CONSTRAINT "FK_eb9a227f564b6c4e85fb296dbdd" FOREIGN KEY ("titleImageId") REFERENCES "image"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }
}
