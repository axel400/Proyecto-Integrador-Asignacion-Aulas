import { MigrationInterface, QueryRunner } from "typeorm";

export class mg1657585253761 implements MigrationInterface {
    name = 'mg1657585253761'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "general_schedule" DROP CONSTRAINT "FK_bc76a9bfcee14385995eac97f5c"`);
        await queryRunner.query(`ALTER TABLE "general_schedule" DROP CONSTRAINT "FK_d33af729bf1412537e25cd66d29"`);
        await queryRunner.query(`ALTER TABLE "general_schedule" DROP COLUMN "career_id"`);
        await queryRunner.query(`ALTER TABLE "general_schedule" DROP COLUMN "teacher_id"`);
        await queryRunner.query(`ALTER TABLE "general_schedule" ADD "level_id" integer`);
        await queryRunner.query(`ALTER TABLE "general_schedule" ADD CONSTRAINT "FK_ee0957f94adffd23c44e08d39ad" FOREIGN KEY ("level_id") REFERENCES "classroom"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "general_schedule" DROP CONSTRAINT "FK_ee0957f94adffd23c44e08d39ad"`);
        await queryRunner.query(`ALTER TABLE "general_schedule" DROP COLUMN "level_id"`);
        await queryRunner.query(`ALTER TABLE "general_schedule" ADD "teacher_id" integer`);
        await queryRunner.query(`ALTER TABLE "general_schedule" ADD "career_id" integer`);
        await queryRunner.query(`ALTER TABLE "general_schedule" ADD CONSTRAINT "FK_d33af729bf1412537e25cd66d29" FOREIGN KEY ("teacher_id") REFERENCES "teacher"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "general_schedule" ADD CONSTRAINT "FK_bc76a9bfcee14385995eac97f5c" FOREIGN KEY ("career_id") REFERENCES "career"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
