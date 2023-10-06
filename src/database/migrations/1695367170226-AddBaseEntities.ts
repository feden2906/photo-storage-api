import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddBaseEntities1695367170226 implements MigrationInterface {
  name = 'AddBaseEntities1695367170226';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "media_to_albums" ("albumId" uuid NOT NULL, "mediaId" uuid NOT NULL, CONSTRAINT "PK_b53063b809dc736dbec4ff06c10" PRIMARY KEY ("albumId", "mediaId"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("created" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "updated" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstName" text NOT NULL, "lastName" text NOT NULL, "email" text NOT NULL, "password" text, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "media" ("created" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "updated" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "url" text NOT NULL, "userId" uuid, CONSTRAINT "PK_f4e0fcac36e050de337b670d8bd" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "album" ("created" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "updated" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text NOT NULL, "titleImageId" uuid, "albumOwnerId" uuid, CONSTRAINT "PK_58e0b4b8a31bb897e6959fe3206" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_side_albums_album" ("userId" uuid NOT NULL, "albumId" uuid NOT NULL, CONSTRAINT "PK_f44421186991fe025959989bdfa" PRIMARY KEY ("userId", "albumId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_f60d6b3d63221cee5728120c1a" ON "user_side_albums_album" ("userId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_023c14789152fa714eaa252eea" ON "user_side_albums_album" ("albumId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "media_to_albums" ADD CONSTRAINT "FK_7af7e0b190f7e432d6e9bc3b314" FOREIGN KEY ("albumId") REFERENCES "album"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "media_to_albums" ADD CONSTRAINT "FK_fc982e6f321af4586d3f7aff460" FOREIGN KEY ("mediaId") REFERENCES "media"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "media" ADD CONSTRAINT "FK_0db866835bf356d896e1892635d" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "album" ADD CONSTRAINT "FK_eb9a227f564b6c4e85fb296dbdd" FOREIGN KEY ("titleImageId") REFERENCES "media"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "album" ADD CONSTRAINT "FK_ba46382951288a6053f44570f82" FOREIGN KEY ("albumOwnerId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_side_albums_album" ADD CONSTRAINT "FK_f60d6b3d63221cee5728120c1a6" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_side_albums_album" ADD CONSTRAINT "FK_023c14789152fa714eaa252eea4" FOREIGN KEY ("albumId") REFERENCES "album"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_side_albums_album" DROP CONSTRAINT "FK_023c14789152fa714eaa252eea4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_side_albums_album" DROP CONSTRAINT "FK_f60d6b3d63221cee5728120c1a6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "album" DROP CONSTRAINT "FK_ba46382951288a6053f44570f82"`,
    );
    await queryRunner.query(
      `ALTER TABLE "album" DROP CONSTRAINT "FK_eb9a227f564b6c4e85fb296dbdd"`,
    );
    await queryRunner.query(
      `ALTER TABLE "media" DROP CONSTRAINT "FK_0db866835bf356d896e1892635d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "media_to_albums" DROP CONSTRAINT "FK_fc982e6f321af4586d3f7aff460"`,
    );
    await queryRunner.query(
      `ALTER TABLE "media_to_albums" DROP CONSTRAINT "FK_7af7e0b190f7e432d6e9bc3b314"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_023c14789152fa714eaa252eea"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_f60d6b3d63221cee5728120c1a"`,
    );
    await queryRunner.query(`DROP TABLE "user_side_albums_album"`);
    await queryRunner.query(`DROP TABLE "album"`);
    await queryRunner.query(`DROP TABLE "media"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "media_to_albums"`);
  }
}
