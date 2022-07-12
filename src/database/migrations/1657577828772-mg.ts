import { MigrationInterface, QueryRunner } from "typeorm";

export class mg1657577828772 implements MigrationInterface {
    name = 'mg1657577828772'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "create_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user" ADD "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user" ADD "delete_at" TIMESTAMP WITH TIME ZONE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "delete_at"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "update_at"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "create_at"`);
    }

}
