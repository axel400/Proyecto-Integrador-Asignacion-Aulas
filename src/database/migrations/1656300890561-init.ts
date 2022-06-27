import {MigrationInterface, QueryRunner} from "typeorm";

export class init1656300890561 implements MigrationInterface {
    name = 'init1656300890561'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "status" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_e12743a7086ec826733f54e1d95" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "classroom" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "statusId" integer, CONSTRAINT "PK_729f896c8b7b96ddf10c341e6ff" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "day" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_42e726f6b72349f70b25598b50e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "school_year" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_77783460dce6d4d0ded59c4f246" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "weekday_days" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_fe6010c1ef3b26d4aa5e178cf9f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "classroom" ADD CONSTRAINT "FK_a2c148f6e4a72e3b51a4409c1a9" FOREIGN KEY ("statusId") REFERENCES "status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "classroom" DROP CONSTRAINT "FK_a2c148f6e4a72e3b51a4409c1a9"`);
        await queryRunner.query(`DROP TABLE "weekday_days"`);
        await queryRunner.query(`DROP TABLE "school_year"`);
        await queryRunner.query(`DROP TABLE "day"`);
        await queryRunner.query(`DROP TABLE "classroom"`);
        await queryRunner.query(`DROP TABLE "status"`);
    }

}
