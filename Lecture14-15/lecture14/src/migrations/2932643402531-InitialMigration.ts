import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration2932643402531 implements MigrationInterface {
    name = 'InitialMigration2932643402531'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "exhibits" ("id" SERIAL NOT NULL, "imageUrl" character varying NOT NULL, "description" text NOT NULL, "userId" integer NOT NULL, "commentCount" integer NOT NULL DEFAULT '0', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_63888935e8c674f871d4f851eea" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "username" character varying(50) NOT NULL, "password" character varying NOT NULL, "isAdmin" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "exhibits" ADD CONSTRAINT "FK_af1f6e51eda81b2ed2659a40bf2" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "exhibits" DROP CONSTRAINT "FK_af1f6e51eda81b2ed2659a40bf2"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "exhibits"`);
    }

}
