import { MigrationInterface, QueryRunner } from "typeorm";

export class mg1657649465768 implements MigrationInterface {
    name = 'mg1657649465768'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "school_year" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "create_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "delete_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_77783460dce6d4d0ded59c4f246" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "journey" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "create_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "delete_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_0dfc23b6e61590ef493cf3adcde" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "level" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "create_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "delete_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_d3f1a7a6f09f1c3144bacdc6bcc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "course" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "create_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "delete_at" TIMESTAMP WITH TIME ZONE, "level_id" integer, CONSTRAINT "PK_bf95180dd756fd204fb01ce4916" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "subject" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "create_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "delete_at" TIMESTAMP WITH TIME ZONE, "journey_id" integer, "course_id" integer, CONSTRAINT "PK_12eee115462e38d62e5455fc054" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "teacher" ("id" SERIAL NOT NULL, "idCard" character varying NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "telephone" character varying NOT NULL, "create_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "delete_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_2f807294148612a9751dacf1026" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "day" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "create_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "delete_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_42e726f6b72349f70b25598b50e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "schedule" ("id" SERIAL NOT NULL, "date" character varying NOT NULL, "startTime" character varying NOT NULL, "endTime" character varying NOT NULL, "create_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "delete_at" TIMESTAMP WITH TIME ZONE, "day_id" integer, "status_id" integer, CONSTRAINT "PK_1c05e42aec7371641193e180046" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "status" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "create_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "delete_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_e12743a7086ec826733f54e1d95" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "classroom" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "create_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "delete_at" TIMESTAMP WITH TIME ZONE, "status_id" integer, CONSTRAINT "PK_729f896c8b7b96ddf10c341e6ff" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "general_schedule" ("id" SERIAL NOT NULL, "create_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "delete_at" TIMESTAMP WITH TIME ZONE, "classroom_id" integer, "schedule_id" integer, "teacherCareerSubject_id" integer, CONSTRAINT "PK_b073894e07bbb18182a1a8338fd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "teacher_career_subject" ("id" SERIAL NOT NULL, "create_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "delete_at" TIMESTAMP WITH TIME ZONE, "teacher_id" integer, "career_id" integer, "subject_id" integer, CONSTRAINT "PK_3555891e0ca62ef3228ce4ffd9e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "career" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "create_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "delete_at" TIMESTAMP WITH TIME ZONE, "schoolYear_id" integer, CONSTRAINT "PK_5f694c0aa9babcae2c4ad61c7d0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "role" character varying NOT NULL, "create_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "delete_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "course" ADD CONSTRAINT "FK_fab4dc4ff554cd78d16012c6d41" FOREIGN KEY ("level_id") REFERENCES "level"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "subject" ADD CONSTRAINT "FK_a03da08160978428e12519560e9" FOREIGN KEY ("journey_id") REFERENCES "journey"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "subject" ADD CONSTRAINT "FK_b9db72ddc93f196bf9d79132171" FOREIGN KEY ("course_id") REFERENCES "course"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "schedule" ADD CONSTRAINT "FK_a98a46ced73651332d6ce829335" FOREIGN KEY ("day_id") REFERENCES "day"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "schedule" ADD CONSTRAINT "FK_113a989d06ad0a38634925a7f3e" FOREIGN KEY ("status_id") REFERENCES "status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "classroom" ADD CONSTRAINT "FK_84156605bac9a203f38c3d4a4c7" FOREIGN KEY ("status_id") REFERENCES "status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "general_schedule" ADD CONSTRAINT "FK_88b610eabb30cf4b46a8a41c7be" FOREIGN KEY ("classroom_id") REFERENCES "classroom"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "general_schedule" ADD CONSTRAINT "FK_76b94c2b0ae12e24ad434a4cd79" FOREIGN KEY ("schedule_id") REFERENCES "schedule"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "general_schedule" ADD CONSTRAINT "FK_0a623ba0d5d998f95cac9605f80" FOREIGN KEY ("teacherCareerSubject_id") REFERENCES "teacher_career_subject"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "teacher_career_subject" ADD CONSTRAINT "FK_d8c0300e97cfd2f1015f8784b3d" FOREIGN KEY ("teacher_id") REFERENCES "teacher"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "teacher_career_subject" ADD CONSTRAINT "FK_4568d11fecb8f69a6840f12f027" FOREIGN KEY ("career_id") REFERENCES "career"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "teacher_career_subject" ADD CONSTRAINT "FK_d507fa2b4d1924b1a4fc2d26a42" FOREIGN KEY ("subject_id") REFERENCES "subject"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "career" ADD CONSTRAINT "FK_0f6397718de66a7e2e1f5cec78a" FOREIGN KEY ("schoolYear_id") REFERENCES "school_year"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "career" DROP CONSTRAINT "FK_0f6397718de66a7e2e1f5cec78a"`);
        await queryRunner.query(`ALTER TABLE "teacher_career_subject" DROP CONSTRAINT "FK_d507fa2b4d1924b1a4fc2d26a42"`);
        await queryRunner.query(`ALTER TABLE "teacher_career_subject" DROP CONSTRAINT "FK_4568d11fecb8f69a6840f12f027"`);
        await queryRunner.query(`ALTER TABLE "teacher_career_subject" DROP CONSTRAINT "FK_d8c0300e97cfd2f1015f8784b3d"`);
        await queryRunner.query(`ALTER TABLE "general_schedule" DROP CONSTRAINT "FK_0a623ba0d5d998f95cac9605f80"`);
        await queryRunner.query(`ALTER TABLE "general_schedule" DROP CONSTRAINT "FK_76b94c2b0ae12e24ad434a4cd79"`);
        await queryRunner.query(`ALTER TABLE "general_schedule" DROP CONSTRAINT "FK_88b610eabb30cf4b46a8a41c7be"`);
        await queryRunner.query(`ALTER TABLE "classroom" DROP CONSTRAINT "FK_84156605bac9a203f38c3d4a4c7"`);
        await queryRunner.query(`ALTER TABLE "schedule" DROP CONSTRAINT "FK_113a989d06ad0a38634925a7f3e"`);
        await queryRunner.query(`ALTER TABLE "schedule" DROP CONSTRAINT "FK_a98a46ced73651332d6ce829335"`);
        await queryRunner.query(`ALTER TABLE "subject" DROP CONSTRAINT "FK_b9db72ddc93f196bf9d79132171"`);
        await queryRunner.query(`ALTER TABLE "subject" DROP CONSTRAINT "FK_a03da08160978428e12519560e9"`);
        await queryRunner.query(`ALTER TABLE "course" DROP CONSTRAINT "FK_fab4dc4ff554cd78d16012c6d41"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "career"`);
        await queryRunner.query(`DROP TABLE "teacher_career_subject"`);
        await queryRunner.query(`DROP TABLE "general_schedule"`);
        await queryRunner.query(`DROP TABLE "classroom"`);
        await queryRunner.query(`DROP TABLE "status"`);
        await queryRunner.query(`DROP TABLE "schedule"`);
        await queryRunner.query(`DROP TABLE "day"`);
        await queryRunner.query(`DROP TABLE "teacher"`);
        await queryRunner.query(`DROP TABLE "subject"`);
        await queryRunner.query(`DROP TABLE "course"`);
        await queryRunner.query(`DROP TABLE "level"`);
        await queryRunner.query(`DROP TABLE "journey"`);
        await queryRunner.query(`DROP TABLE "school_year"`);
    }

}
