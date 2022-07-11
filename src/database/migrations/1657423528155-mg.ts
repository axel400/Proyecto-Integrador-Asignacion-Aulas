import { MigrationInterface, QueryRunner } from "typeorm";

export class mg1657423528155 implements MigrationInterface {
    name = 'mg1657423528155'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "level" ADD "create_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "level" ADD "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "level" ADD "delete_at" TIMESTAMP WITH TIME ZONE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "level" DROP COLUMN "delete_at"`);
        await queryRunner.query(`ALTER TABLE "level" DROP COLUMN "update_at"`);
        await queryRunner.query(`ALTER TABLE "level" DROP COLUMN "create_at"`);
    }

}
