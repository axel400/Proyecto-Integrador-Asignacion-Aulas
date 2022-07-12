import { MigrationInterface, QueryRunner } from "typeorm";

export class mg1657571927690 implements MigrationInterface {
    name = 'mg1657571927690'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "schedule" ADD "status_id" integer`);
        await queryRunner.query(`ALTER TABLE "schedule" ADD CONSTRAINT "FK_113a989d06ad0a38634925a7f3e" FOREIGN KEY ("status_id") REFERENCES "status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "schedule" DROP CONSTRAINT "FK_113a989d06ad0a38634925a7f3e"`);
        await queryRunner.query(`ALTER TABLE "schedule" DROP COLUMN "status_id"`);
    }

}
