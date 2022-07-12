import { MigrationInterface, QueryRunner } from "typeorm";

export class mg1657575236272 implements MigrationInterface {
    name = 'mg1657575236272'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subject" ADD "create_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "subject" ADD "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "subject" ADD "delete_at" TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "subject" ADD "level_id" integer`);
        await queryRunner.query(`ALTER TABLE "subject" ADD CONSTRAINT "FK_49e19667f2ea3a062ace64fe1c6" FOREIGN KEY ("level_id") REFERENCES "journey"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subject" DROP CONSTRAINT "FK_49e19667f2ea3a062ace64fe1c6"`);
        await queryRunner.query(`ALTER TABLE "subject" DROP COLUMN "level_id"`);
        await queryRunner.query(`ALTER TABLE "subject" DROP COLUMN "delete_at"`);
        await queryRunner.query(`ALTER TABLE "subject" DROP COLUMN "update_at"`);
        await queryRunner.query(`ALTER TABLE "subject" DROP COLUMN "create_at"`);
    }

}
