import { MigrationInterface, QueryRunner } from "typeorm";

export class mg1657567546413 implements MigrationInterface {
    name = 'mg1657567546413'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "status" ADD "create_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "status" ADD "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "status" ADD "delete_at" TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "classroom" ADD "status_id" integer`);
        await queryRunner.query(`ALTER TABLE "classroom" ADD CONSTRAINT "FK_84156605bac9a203f38c3d4a4c7" FOREIGN KEY ("status_id") REFERENCES "status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "classroom" DROP CONSTRAINT "FK_84156605bac9a203f38c3d4a4c7"`);
        await queryRunner.query(`ALTER TABLE "classroom" DROP COLUMN "status_id"`);
        await queryRunner.query(`ALTER TABLE "status" DROP COLUMN "delete_at"`);
        await queryRunner.query(`ALTER TABLE "status" DROP COLUMN "update_at"`);
        await queryRunner.query(`ALTER TABLE "status" DROP COLUMN "create_at"`);
    }

}
