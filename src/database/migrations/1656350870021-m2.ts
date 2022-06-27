import {MigrationInterface, QueryRunner} from "typeorm";

export class m21656350870021 implements MigrationInterface {
    name = 'm21656350870021'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "schedule" ("id" SERIAL NOT NULL, "date" TIMESTAMP NOT NULL, "startTime" TIMESTAMP NOT NULL, "endTime" TIMESTAMP NOT NULL, "statusId" integer, "weekdaydaysId" integer, CONSTRAINT "PK_1c05e42aec7371641193e180046" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "teacher_career_subject" ("id" SERIAL NOT NULL, "careerId" integer, "teacherIdCard" integer, "subjectIdCard" integer, CONSTRAINT "PK_3555891e0ca62ef3228ce4ffd9e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "general_schedule" ("id" SERIAL NOT NULL, "classroomId" integer, "teachercareersubjectId" integer, "scheduleId" integer, CONSTRAINT "PK_b073894e07bbb18182a1a8338fd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "schedule" ADD CONSTRAINT "FK_da2b1962c1086a815e3ca3e6ab6" FOREIGN KEY ("statusId") REFERENCES "status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "schedule" ADD CONSTRAINT "FK_bfad3c7075f11e1436fdc74e227" FOREIGN KEY ("weekdaydaysId") REFERENCES "weekday_days"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "teacher_career_subject" ADD CONSTRAINT "FK_bb58a862517bcb8605997b6f604" FOREIGN KEY ("careerId") REFERENCES "career"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "teacher_career_subject" ADD CONSTRAINT "FK_6a6809c9a6c10f23a6426c56310" FOREIGN KEY ("teacherIdCard") REFERENCES "teacher"("idCard") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "teacher_career_subject" ADD CONSTRAINT "FK_762ae26656ce23fd44ca772b798" FOREIGN KEY ("subjectIdCard") REFERENCES "subject"("idCard") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "general_schedule" ADD CONSTRAINT "FK_0d95aec3b474e5ba0ffe3098db1" FOREIGN KEY ("classroomId") REFERENCES "classroom"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "general_schedule" ADD CONSTRAINT "FK_6abc432aa56904e502d08c39319" FOREIGN KEY ("teachercareersubjectId") REFERENCES "teacher_career_subject"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "general_schedule" ADD CONSTRAINT "FK_a9d763fd67a63e59dd82eaf3b7b" FOREIGN KEY ("scheduleId") REFERENCES "schedule"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "general_schedule" DROP CONSTRAINT "FK_a9d763fd67a63e59dd82eaf3b7b"`);
        await queryRunner.query(`ALTER TABLE "general_schedule" DROP CONSTRAINT "FK_6abc432aa56904e502d08c39319"`);
        await queryRunner.query(`ALTER TABLE "general_schedule" DROP CONSTRAINT "FK_0d95aec3b474e5ba0ffe3098db1"`);
        await queryRunner.query(`ALTER TABLE "teacher_career_subject" DROP CONSTRAINT "FK_762ae26656ce23fd44ca772b798"`);
        await queryRunner.query(`ALTER TABLE "teacher_career_subject" DROP CONSTRAINT "FK_6a6809c9a6c10f23a6426c56310"`);
        await queryRunner.query(`ALTER TABLE "teacher_career_subject" DROP CONSTRAINT "FK_bb58a862517bcb8605997b6f604"`);
        await queryRunner.query(`ALTER TABLE "schedule" DROP CONSTRAINT "FK_bfad3c7075f11e1436fdc74e227"`);
        await queryRunner.query(`ALTER TABLE "schedule" DROP CONSTRAINT "FK_da2b1962c1086a815e3ca3e6ab6"`);
        await queryRunner.query(`DROP TABLE "general_schedule"`);
        await queryRunner.query(`DROP TABLE "teacher_career_subject"`);
        await queryRunner.query(`DROP TABLE "schedule"`);
    }

}
