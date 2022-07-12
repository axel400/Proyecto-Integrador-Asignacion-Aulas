import { MigrationInterface, QueryRunner } from "typeorm";

export class mg1657571276624 implements MigrationInterface {
    name = 'mg1657571276624'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "classroom" ADD "create_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "classroom" ADD "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "classroom" ADD "delete_at" TIMESTAMP WITH TIME ZONE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "classroom" DROP COLUMN "delete_at"`);
        await queryRunner.query(`ALTER TABLE "classroom" DROP COLUMN "update_at"`);
        await queryRunner.query(`ALTER TABLE "classroom" DROP COLUMN "create_at"`);
    }

}
