import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddBaseEntities1693905065847 implements MigrationInterface {
  name = 'AddBaseEntities1693905065847';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("created" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "updated" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstName" text NOT NULL, "lastName" text NOT NULL, "email" text NOT NULL, "password" text, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "album" ("created" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "updated" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "titleImageId" uuid, "albumOwnerId" uuid, CONSTRAINT "PK_58e0b4b8a31bb897e6959fe3206" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "image" ("created" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "updated" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "url" text NOT NULL, "userId" uuid, CONSTRAINT "PK_d6db1ab4ee9ad9dbe86c64e4cc3" PRIMARY KEY ("id"))`,
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
      `CREATE TABLE "image_albums_album" ("imageId" uuid NOT NULL, "albumId" uuid NOT NULL, CONSTRAINT "PK_d0e6518b1ac7e906e7a75aaa30a" PRIMARY KEY ("imageId", "albumId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_c00718f5af4998b766daa54ae6" ON "image_albums_album" ("imageId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_bd22683ffd6eadeadba48bc841" ON "image_albums_album" ("albumId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "album" ADD CONSTRAINT "FK_eb9a227f564b6c4e85fb296dbdd" FOREIGN KEY ("titleImageId") REFERENCES "image"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "album" ADD CONSTRAINT "FK_ba46382951288a6053f44570f82" FOREIGN KEY ("albumOwnerId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "image" ADD CONSTRAINT "FK_dc40417dfa0c7fbd70b8eb880cc" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_side_albums_album" ADD CONSTRAINT "FK_f60d6b3d63221cee5728120c1a6" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_side_albums_album" ADD CONSTRAINT "FK_023c14789152fa714eaa252eea4" FOREIGN KEY ("albumId") REFERENCES "album"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "image_albums_album" ADD CONSTRAINT "FK_c00718f5af4998b766daa54ae6c" FOREIGN KEY ("imageId") REFERENCES "image"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "image_albums_album" ADD CONSTRAINT "FK_bd22683ffd6eadeadba48bc8415" FOREIGN KEY ("albumId") REFERENCES "album"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "image_albums_album" DROP CONSTRAINT "FK_bd22683ffd6eadeadba48bc8415"`,
    );
    await queryRunner.query(
      `ALTER TABLE "image_albums_album" DROP CONSTRAINT "FK_c00718f5af4998b766daa54ae6c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_side_albums_album" DROP CONSTRAINT "FK_023c14789152fa714eaa252eea4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_side_albums_album" DROP CONSTRAINT "FK_f60d6b3d63221cee5728120c1a6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "image" DROP CONSTRAINT "FK_dc40417dfa0c7fbd70b8eb880cc"`,
    );
    await queryRunner.query(
      `ALTER TABLE "album" DROP CONSTRAINT "FK_ba46382951288a6053f44570f82"`,
    );
    await queryRunner.query(
      `ALTER TABLE "album" DROP CONSTRAINT "FK_eb9a227f564b6c4e85fb296dbdd"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_bd22683ffd6eadeadba48bc841"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_c00718f5af4998b766daa54ae6"`,
    );
    await queryRunner.query(`DROP TABLE "image_albums_album"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_023c14789152fa714eaa252eea"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_f60d6b3d63221cee5728120c1a"`,
    );
    await queryRunner.query(`DROP TABLE "user_side_albums_album"`);
    await queryRunner.query(`DROP TABLE "image"`);
    await queryRunner.query(`DROP TABLE "album"`);
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
