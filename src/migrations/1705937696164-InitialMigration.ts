import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1705937696164 implements MigrationInterface {
    name = 'InitialMigration1705937696164'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks" ALTER COLUMN "description" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks" ALTER COLUMN "description" DROP NOT NULL`);
    }

}
