import { MigrationInterface, QueryRunner } from "typeorm";

export class mg1657561250353 implements MigrationInterface {
    name = 'mg1657561250353'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "school_year" ADD "create_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "school_year" ADD "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "school_year" ADD "delete_at" TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "career" ADD "create_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "career" ADD "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "career" ADD "delete_at" TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "career" ADD "schoolYear_id" integer`);
        await queryRunner.query(`ALTER TABLE "career" ADD CONSTRAINT "FK_0f6397718de66a7e2e1f5cec78a" FOREIGN KEY ("schoolYear_id") REFERENCES "school_year"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "career" DROP CONSTRAINT "FK_0f6397718de66a7e2e1f5cec78a"`);
        await queryRunner.query(`ALTER TABLE "career" DROP COLUMN "schoolYear_id"`);
        await queryRunner.query(`ALTER TABLE "career" DROP COLUMN "delete_at"`);
        await queryRunner.query(`ALTER TABLE "career" DROP COLUMN "update_at"`);
        await queryRunner.query(`ALTER TABLE "career" DROP COLUMN "create_at"`);
        await queryRunner.query(`ALTER TABLE "school_year" DROP COLUMN "delete_at"`);
        await queryRunner.query(`ALTER TABLE "school_year" DROP COLUMN "update_at"`);
        await queryRunner.query(`ALTER TABLE "school_year" DROP COLUMN "create_at"`);
    }

}
