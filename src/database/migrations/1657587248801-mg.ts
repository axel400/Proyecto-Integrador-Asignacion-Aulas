import { MigrationInterface, QueryRunner } from "typeorm";

export class mg1657587248801 implements MigrationInterface {
    name = 'mg1657587248801'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "teacher_career_subject" ADD "create_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "teacher_career_subject" ADD "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "teacher_career_subject" ADD "delete_at" TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "teacher_career_subject" ADD "teacher_id" integer`);
        await queryRunner.query(`ALTER TABLE "teacher_career_subject" ADD "career_id" integer`);
        await queryRunner.query(`ALTER TABLE "teacher_career_subject" ADD "subject_id" integer`);
        await queryRunner.query(`ALTER TABLE "teacher_career_subject" ADD CONSTRAINT "FK_d8c0300e97cfd2f1015f8784b3d" FOREIGN KEY ("teacher_id") REFERENCES "teacher"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "teacher_career_subject" ADD CONSTRAINT "FK_4568d11fecb8f69a6840f12f027" FOREIGN KEY ("career_id") REFERENCES "career"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "teacher_career_subject" ADD CONSTRAINT "FK_d507fa2b4d1924b1a4fc2d26a42" FOREIGN KEY ("subject_id") REFERENCES "subject"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "teacher_career_subject" DROP CONSTRAINT "FK_d507fa2b4d1924b1a4fc2d26a42"`);
        await queryRunner.query(`ALTER TABLE "teacher_career_subject" DROP CONSTRAINT "FK_4568d11fecb8f69a6840f12f027"`);
        await queryRunner.query(`ALTER TABLE "teacher_career_subject" DROP CONSTRAINT "FK_d8c0300e97cfd2f1015f8784b3d"`);
        await queryRunner.query(`ALTER TABLE "teacher_career_subject" DROP COLUMN "subject_id"`);
        await queryRunner.query(`ALTER TABLE "teacher_career_subject" DROP COLUMN "career_id"`);
        await queryRunner.query(`ALTER TABLE "teacher_career_subject" DROP COLUMN "teacher_id"`);
        await queryRunner.query(`ALTER TABLE "teacher_career_subject" DROP COLUMN "delete_at"`);
        await queryRunner.query(`ALTER TABLE "teacher_career_subject" DROP COLUMN "update_at"`);
        await queryRunner.query(`ALTER TABLE "teacher_career_subject" DROP COLUMN "create_at"`);
    }

}
