import { MigrationInterface, QueryRunner } from "typeorm";

export class mg1657585859360 implements MigrationInterface {
    name = 'mg1657585859360'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "general_schedule" DROP CONSTRAINT "FK_ee0957f94adffd23c44e08d39ad"`);
        await queryRunner.query(`ALTER TABLE "general_schedule" DROP COLUMN "level_id"`);
        await queryRunner.query(`ALTER TABLE "general_schedule" ADD "classroom_id" integer`);
        await queryRunner.query(`ALTER TABLE "general_schedule" ADD "schedule_id" integer`);
        await queryRunner.query(`ALTER TABLE "general_schedule" ADD CONSTRAINT "FK_88b610eabb30cf4b46a8a41c7be" FOREIGN KEY ("classroom_id") REFERENCES "classroom"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "general_schedule" ADD CONSTRAINT "FK_76b94c2b0ae12e24ad434a4cd79" FOREIGN KEY ("schedule_id") REFERENCES "schedule"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "general_schedule" DROP CONSTRAINT "FK_76b94c2b0ae12e24ad434a4cd79"`);
        await queryRunner.query(`ALTER TABLE "general_schedule" DROP CONSTRAINT "FK_88b610eabb30cf4b46a8a41c7be"`);
        await queryRunner.query(`ALTER TABLE "general_schedule" DROP COLUMN "schedule_id"`);
        await queryRunner.query(`ALTER TABLE "general_schedule" DROP COLUMN "classroom_id"`);
        await queryRunner.query(`ALTER TABLE "general_schedule" ADD "level_id" integer`);
        await queryRunner.query(`ALTER TABLE "general_schedule" ADD CONSTRAINT "FK_ee0957f94adffd23c44e08d39ad" FOREIGN KEY ("level_id") REFERENCES "classroom"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
