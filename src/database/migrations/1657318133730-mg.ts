import { MigrationInterface, QueryRunner } from "typeorm";

export class mg1657318133730 implements MigrationInterface {
    name = 'mg1657318133730'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "general_schedule" ("id" SERIAL NOT NULL, CONSTRAINT "PK_b073894e07bbb18182a1a8338fd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "teacher_career_subject" ("id" SERIAL NOT NULL, CONSTRAINT "PK_3555891e0ca62ef3228ce4ffd9e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "career" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_5f694c0aa9babcae2c4ad61c7d0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "classroom" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_729f896c8b7b96ddf10c341e6ff" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "level" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_d3f1a7a6f09f1c3144bacdc6bcc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "course" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "level_id" integer, CONSTRAINT "PK_bf95180dd756fd204fb01ce4916" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "day" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_42e726f6b72349f70b25598b50e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "schedule" ("id" SERIAL NOT NULL, "date" character varying NOT NULL, "startTime" character varying NOT NULL, "endTime" character varying NOT NULL, CONSTRAINT "PK_1c05e42aec7371641193e180046" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "school_year" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_77783460dce6d4d0ded59c4f246" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "status" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_e12743a7086ec826733f54e1d95" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "subject" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_12eee115462e38d62e5455fc054" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "role" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "teacher" ("id" SERIAL NOT NULL, "idCard" character varying NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "telephone" character varying NOT NULL, CONSTRAINT "PK_2f807294148612a9751dacf1026" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "weekday_days" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_fe6010c1ef3b26d4aa5e178cf9f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "course" ADD CONSTRAINT "FK_fab4dc4ff554cd78d16012c6d41" FOREIGN KEY ("level_id") REFERENCES "level"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "course" DROP CONSTRAINT "FK_fab4dc4ff554cd78d16012c6d41"`);
        await queryRunner.query(`DROP TABLE "weekday_days"`);
        await queryRunner.query(`DROP TABLE "teacher"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "subject"`);
        await queryRunner.query(`DROP TABLE "status"`);
        await queryRunner.query(`DROP TABLE "school_year"`);
        await queryRunner.query(`DROP TABLE "schedule"`);
        await queryRunner.query(`DROP TABLE "day"`);
        await queryRunner.query(`DROP TABLE "course"`);
        await queryRunner.query(`DROP TABLE "level"`);
        await queryRunner.query(`DROP TABLE "classroom"`);
        await queryRunner.query(`DROP TABLE "career"`);
        await queryRunner.query(`DROP TABLE "teacher_career_subject"`);
        await queryRunner.query(`DROP TABLE "general_schedule"`);
    }

}
