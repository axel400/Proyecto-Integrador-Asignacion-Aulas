import { MigrationInterface, QueryRunner } from "typeorm";

export class mg1657424283948 implements MigrationInterface {
    name = 'mg1657424283948'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "course" ADD "create_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "course" ADD "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "course" ADD "delete_at" TIMESTAMP WITH TIME ZONE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "course" DROP COLUMN "delete_at"`);
        await queryRunner.query(`ALTER TABLE "course" DROP COLUMN "update_at"`);
        await queryRunner.query(`ALTER TABLE "course" DROP COLUMN "create_at"`);
    }

}
