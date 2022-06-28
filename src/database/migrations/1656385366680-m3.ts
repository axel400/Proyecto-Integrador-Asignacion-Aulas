import { MigrationInterface, QueryRunner } from "typeorm";

export class m31656385366680 implements MigrationInterface {
    name = 'm31656385366680'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "status" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_e12743a7086ec826733f54e1d95" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "schedule" ("id" SERIAL NOT NULL, "date" TIMESTAMP NOT NULL, "startTime" TIMESTAMP NOT NULL, "endTime" TIMESTAMP NOT NULL, "statusId" integer, CONSTRAINT "PK_1c05e42aec7371641193e180046" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "level" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_d3f1a7a6f09f1c3144bacdc6bcc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "course" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "levelId" integer, CONSTRAINT "PK_bf95180dd756fd204fb01ce4916" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "day" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_42e726f6b72349f70b25598b50e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "subject" ("idCard" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "courseId" integer, "dayId" integer, CONSTRAINT "PK_c86596152a68259ed43e13df6a4" PRIMARY KEY ("idCard"))`);
        await queryRunner.query(`CREATE TABLE "school_year" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_77783460dce6d4d0ded59c4f246" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "career" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "schoolYearId" integer, CONSTRAINT "PK_5f694c0aa9babcae2c4ad61c7d0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "teacher" ("idCard" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "telephone" character varying NOT NULL, CONSTRAINT "PK_986cb20b75c6a72aaae7c3cb56b" PRIMARY KEY ("idCard"))`);
        await queryRunner.query(`CREATE TABLE "teacher_career_subject" ("id" SERIAL NOT NULL, "careerId" integer, "teacherIdCard" integer, "subjectIdCard" integer, CONSTRAINT "PK_3555891e0ca62ef3228ce4ffd9e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "general_schedule" ("id" SERIAL NOT NULL, "classroomId" integer, "teachercareersubjectId" integer, "scheduleId" integer, CONSTRAINT "PK_b073894e07bbb18182a1a8338fd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "classroom" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "statusId" integer, CONSTRAINT "PK_729f896c8b7b96ddf10c341e6ff" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "weekday_days" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_fe6010c1ef3b26d4aa5e178cf9f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "schedule" ADD CONSTRAINT "FK_da2b1962c1086a815e3ca3e6ab6" FOREIGN KEY ("statusId") REFERENCES "status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "course" ADD CONSTRAINT "FK_9679d37e8ce033b56d27e271609" FOREIGN KEY ("levelId") REFERENCES "level"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "subject" ADD CONSTRAINT "FK_9a270c7a3ceac259fbe99163d48" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "subject" ADD CONSTRAINT "FK_6546c08a0ac7e6e310544a4755d" FOREIGN KEY ("dayId") REFERENCES "day"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "career" ADD CONSTRAINT "FK_b08ff6a93c31a2d2af8fab0286f" FOREIGN KEY ("schoolYearId") REFERENCES "school_year"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "teacher_career_subject" ADD CONSTRAINT "FK_bb58a862517bcb8605997b6f604" FOREIGN KEY ("careerId") REFERENCES "career"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "teacher_career_subject" ADD CONSTRAINT "FK_6a6809c9a6c10f23a6426c56310" FOREIGN KEY ("teacherIdCard") REFERENCES "teacher"("idCard") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "teacher_career_subject" ADD CONSTRAINT "FK_762ae26656ce23fd44ca772b798" FOREIGN KEY ("subjectIdCard") REFERENCES "subject"("idCard") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "general_schedule" ADD CONSTRAINT "FK_0d95aec3b474e5ba0ffe3098db1" FOREIGN KEY ("classroomId") REFERENCES "classroom"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "general_schedule" ADD CONSTRAINT "FK_6abc432aa56904e502d08c39319" FOREIGN KEY ("teachercareersubjectId") REFERENCES "teacher_career_subject"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "general_schedule" ADD CONSTRAINT "FK_a9d763fd67a63e59dd82eaf3b7b" FOREIGN KEY ("scheduleId") REFERENCES "schedule"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "classroom" ADD CONSTRAINT "FK_a2c148f6e4a72e3b51a4409c1a9" FOREIGN KEY ("statusId") REFERENCES "status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "classroom" DROP CONSTRAINT "FK_a2c148f6e4a72e3b51a4409c1a9"`);
        await queryRunner.query(`ALTER TABLE "general_schedule" DROP CONSTRAINT "FK_a9d763fd67a63e59dd82eaf3b7b"`);
        await queryRunner.query(`ALTER TABLE "general_schedule" DROP CONSTRAINT "FK_6abc432aa56904e502d08c39319"`);
        await queryRunner.query(`ALTER TABLE "general_schedule" DROP CONSTRAINT "FK_0d95aec3b474e5ba0ffe3098db1"`);
        await queryRunner.query(`ALTER TABLE "teacher_career_subject" DROP CONSTRAINT "FK_762ae26656ce23fd44ca772b798"`);
        await queryRunner.query(`ALTER TABLE "teacher_career_subject" DROP CONSTRAINT "FK_6a6809c9a6c10f23a6426c56310"`);
        await queryRunner.query(`ALTER TABLE "teacher_career_subject" DROP CONSTRAINT "FK_bb58a862517bcb8605997b6f604"`);
        await queryRunner.query(`ALTER TABLE "career" DROP CONSTRAINT "FK_b08ff6a93c31a2d2af8fab0286f"`);
        await queryRunner.query(`ALTER TABLE "subject" DROP CONSTRAINT "FK_6546c08a0ac7e6e310544a4755d"`);
        await queryRunner.query(`ALTER TABLE "subject" DROP CONSTRAINT "FK_9a270c7a3ceac259fbe99163d48"`);
        await queryRunner.query(`ALTER TABLE "course" DROP CONSTRAINT "FK_9679d37e8ce033b56d27e271609"`);
        await queryRunner.query(`ALTER TABLE "schedule" DROP CONSTRAINT "FK_da2b1962c1086a815e3ca3e6ab6"`);
        await queryRunner.query(`DROP TABLE "weekday_days"`);
        await queryRunner.query(`DROP TABLE "classroom"`);
        await queryRunner.query(`DROP TABLE "general_schedule"`);
        await queryRunner.query(`DROP TABLE "teacher_career_subject"`);
        await queryRunner.query(`DROP TABLE "teacher"`);
        await queryRunner.query(`DROP TABLE "career"`);
        await queryRunner.query(`DROP TABLE "school_year"`);
        await queryRunner.query(`DROP TABLE "subject"`);
        await queryRunner.query(`DROP TABLE "day"`);
        await queryRunner.query(`DROP TABLE "course"`);
        await queryRunner.query(`DROP TABLE "level"`);
        await queryRunner.query(`DROP TABLE "schedule"`);
        await queryRunner.query(`DROP TABLE "status"`);
    }

}
