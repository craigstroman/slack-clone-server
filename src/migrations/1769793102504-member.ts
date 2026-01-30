import { MigrationInterface, QueryRunner } from 'typeorm';

export class Member1769793102504 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
                CREATE TABLE IF NOT EXISTS public."user"
                (
                    created_at timestamp without time zone NOT NULL DEFAULT now(),
                    updated_at timestamp without time zone NOT NULL DEFAULT now(),
                    owner character varying COLLATE pg_catalog."default" NOT NULL,
                ); 
            `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
