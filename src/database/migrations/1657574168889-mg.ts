import { MigrationInterface, QueryRunner } from "typeorm";

export class mg1657574168889 implements MigrationInterface {
    name = 'mg1657574168889'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "journey" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "create_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "delete_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_0dfc23b6e61590ef493cf3adcde" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "journey"`);
    }

}
