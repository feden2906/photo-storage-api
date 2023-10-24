import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserToAlbum1698129528044 implements MigrationInterface {
  name = 'UserToAlbum1698129528044';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "album" DROP CONSTRAINT "FK_ba46382951288a6053f44570f82"`,
    );
    await queryRunner.query(
      `CREATE TABLE "media_to_album" ("albumId" uuid NOT NULL, "mediaId" uuid NOT NULL, CONSTRAINT "PK_b820e6204e6d76c78583310f502" PRIMARY KEY ("albumId", "mediaId"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."user_to_album_role_enum" AS ENUM('Admin', 'Editor', 'Viewer')`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_to_album" ("albumId" uuid NOT NULL, "userId" uuid NOT NULL, "role" "public"."user_to_album_role_enum" NOT NULL, CONSTRAINT "UQ_b3ac5e20f31b43605b177aca44b" UNIQUE ("albumId", "userId"), CONSTRAINT "PK_b3ac5e20f31b43605b177aca44b" PRIMARY KEY ("albumId", "userId"))`,
    );
    await queryRunner.query(`ALTER TABLE "album" DROP COLUMN "albumOwnerId"`);
    await queryRunner.query(
      `ALTER TABLE "media_to_album" ADD CONSTRAINT "FK_61da7d04684de769d7486c759cd" FOREIGN KEY ("albumId") REFERENCES "album"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "media_to_album" ADD CONSTRAINT "FK_aaab7f0f7dfc04a512843cf4b70" FOREIGN KEY ("mediaId") REFERENCES "media"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_to_album" ADD CONSTRAINT "FK_71cc6799fab721ada1ddd224f25" FOREIGN KEY ("albumId") REFERENCES "album"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_to_album" ADD CONSTRAINT "FK_6eaecb2ce4981d83bb07506b197" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_to_album" DROP CONSTRAINT "FK_6eaecb2ce4981d83bb07506b197"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_to_album" DROP CONSTRAINT "FK_71cc6799fab721ada1ddd224f25"`,
    );
    await queryRunner.query(
      `ALTER TABLE "media_to_album" DROP CONSTRAINT "FK_aaab7f0f7dfc04a512843cf4b70"`,
    );
    await queryRunner.query(
      `ALTER TABLE "media_to_album" DROP CONSTRAINT "FK_61da7d04684de769d7486c759cd"`,
    );
    await queryRunner.query(`ALTER TABLE "album" ADD "albumOwnerId" uuid`);
    await queryRunner.query(`DROP TABLE "user_to_album"`);
    await queryRunner.query(`DROP TYPE "public"."user_to_album_role_enum"`);
    await queryRunner.query(`DROP TABLE "media_to_album"`);
    await queryRunner.query(
      `ALTER TABLE "album" ADD CONSTRAINT "FK_ba46382951288a6053f44570f82" FOREIGN KEY ("albumOwnerId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }
}
