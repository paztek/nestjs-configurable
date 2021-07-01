import {MigrationInterface, QueryRunner} from "typeorm";

export class AddConfigTable1625064282380 implements MigrationInterface {
    name = 'AddConfigTable1625064282380'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "config_type_enum" AS ENUM('boolean', 'number', 'string', 'object')`);
        await queryRunner.query(`CREATE TABLE "config" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "feature" character varying NOT NULL, "path" character varying NOT NULL, "type" "config_type_enum" NOT NULL, "value" text NOT NULL, CONSTRAINT "PK_d0ee79a681413d50b0a4f98cf7b" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "config"`);
        await queryRunner.query(`DROP TYPE "config_type_enum"`);
    }

}
