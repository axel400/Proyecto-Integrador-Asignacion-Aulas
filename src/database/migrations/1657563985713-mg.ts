import { MigrationInterface, QueryRunner } from "typeorm";

export class mg1657563985713 implements MigrationInterface {
    name = 'mg1657563985713'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "schedule" ADD "create_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "schedule" ADD "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "schedule" ADD "delete_at" TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "schedule" ADD "day_id" integer`);
        await queryRunner.query(`ALTER TABLE "day" ADD "create_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "day" ADD "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "day" ADD "delete_at" TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "schedule" ADD CONSTRAINT "FK_a98a46ced73651332d6ce829335" FOREIGN KEY ("day_id") REFERENCES "day"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "schedule" DROP CONSTRAINT "FK_a98a46ced73651332d6ce829335"`);
        await queryRunner.query(`ALTER TABLE "day" DROP COLUMN "delete_at"`);
        await queryRunner.query(`ALTER TABLE "day" DROP COLUMN "update_at"`);
        await queryRunner.query(`ALTER TABLE "day" DROP COLUMN "create_at"`);
        await queryRunner.query(`ALTER TABLE "schedule" DROP COLUMN "day_id"`);
        await queryRunner.query(`ALTER TABLE "schedule" DROP COLUMN "delete_at"`);
        await queryRunner.query(`ALTER TABLE "schedule" DROP COLUMN "update_at"`);
        await queryRunner.query(`ALTER TABLE "schedule" DROP COLUMN "create_at"`);
    }

}
