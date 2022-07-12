import { MigrationInterface, QueryRunner } from "typeorm";

export class mg1657577083341 implements MigrationInterface {
    name = 'mg1657577083341'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "teacher" ADD "create_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "teacher" ADD "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "teacher" ADD "delete_at" TIMESTAMP WITH TIME ZONE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "teacher" DROP COLUMN "delete_at"`);
        await queryRunner.query(`ALTER TABLE "teacher" DROP COLUMN "update_at"`);
        await queryRunner.query(`ALTER TABLE "teacher" DROP COLUMN "create_at"`);
    }

}
