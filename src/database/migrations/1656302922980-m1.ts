import {MigrationInterface, QueryRunner} from "typeorm";

export class m11656302922980 implements MigrationInterface {
    name = 'm11656302922980'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "level" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_d3f1a7a6f09f1c3144bacdc6bcc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "course" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "levelId" integer, CONSTRAINT "PK_bf95180dd756fd204fb01ce4916" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "subject" ("idCard" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "courseId" integer, "dayId" integer, CONSTRAINT "PK_c86596152a68259ed43e13df6a4" PRIMARY KEY ("idCard"))`);
        await queryRunner.query(`CREATE TABLE "career" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "schoolYearId" integer, CONSTRAINT "PK_5f694c0aa9babcae2c4ad61c7d0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "teacher" ("idCard" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "telephone" character varying NOT NULL, CONSTRAINT "PK_986cb20b75c6a72aaae7c3cb56b" PRIMARY KEY ("idCard"))`);
        await queryRunner.query(`ALTER TABLE "course" ADD CONSTRAINT "FK_9679d37e8ce033b56d27e271609" FOREIGN KEY ("levelId") REFERENCES "level"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "subject" ADD CONSTRAINT "FK_9a270c7a3ceac259fbe99163d48" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "subject" ADD CONSTRAINT "FK_6546c08a0ac7e6e310544a4755d" FOREIGN KEY ("dayId") REFERENCES "day"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "career" ADD CONSTRAINT "FK_b08ff6a93c31a2d2af8fab0286f" FOREIGN KEY ("schoolYearId") REFERENCES "school_year"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "career" DROP CONSTRAINT "FK_b08ff6a93c31a2d2af8fab0286f"`);
        await queryRunner.query(`ALTER TABLE "subject" DROP CONSTRAINT "FK_6546c08a0ac7e6e310544a4755d"`);
        await queryRunner.query(`ALTER TABLE "subject" DROP CONSTRAINT "FK_9a270c7a3ceac259fbe99163d48"`);
        await queryRunner.query(`ALTER TABLE "course" DROP CONSTRAINT "FK_9679d37e8ce033b56d27e271609"`);
        await queryRunner.query(`DROP TABLE "teacher"`);
        await queryRunner.query(`DROP TABLE "career"`);
        await queryRunner.query(`DROP TABLE "subject"`);
        await queryRunner.query(`DROP TABLE "course"`);
        await queryRunner.query(`DROP TABLE "level"`);
    }

}
