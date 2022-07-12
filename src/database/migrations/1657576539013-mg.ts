import { MigrationInterface, QueryRunner } from "typeorm";

export class mg1657576539013 implements MigrationInterface {
    name = 'mg1657576539013'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subject" DROP CONSTRAINT "FK_49e19667f2ea3a062ace64fe1c6"`);
        await queryRunner.query(`ALTER TABLE "subject" DROP COLUMN "level_id"`);
        await queryRunner.query(`ALTER TABLE "subject" ADD "journey_id" integer`);
        await queryRunner.query(`ALTER TABLE "subject" ADD "course_id" integer`);
        await queryRunner.query(`ALTER TABLE "subject" ADD CONSTRAINT "FK_a03da08160978428e12519560e9" FOREIGN KEY ("journey_id") REFERENCES "journey"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "subject" ADD CONSTRAINT "FK_b9db72ddc93f196bf9d79132171" FOREIGN KEY ("course_id") REFERENCES "course"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subject" DROP CONSTRAINT "FK_b9db72ddc93f196bf9d79132171"`);
        await queryRunner.query(`ALTER TABLE "subject" DROP CONSTRAINT "FK_a03da08160978428e12519560e9"`);
        await queryRunner.query(`ALTER TABLE "subject" DROP COLUMN "course_id"`);
        await queryRunner.query(`ALTER TABLE "subject" DROP COLUMN "journey_id"`);
        await queryRunner.query(`ALTER TABLE "subject" ADD "level_id" integer`);
        await queryRunner.query(`ALTER TABLE "subject" ADD CONSTRAINT "FK_49e19667f2ea3a062ace64fe1c6" FOREIGN KEY ("level_id") REFERENCES "journey"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
