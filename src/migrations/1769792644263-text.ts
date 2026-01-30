import { MigrationInterface, QueryRunner } from 'typeorm';

export class Text1769792644263 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
                CREATE TABLE IF NOT EXISTS public."user"
                (
                    "createdAt" timestamp without time zone NOT NULL DEFAULT now(),
                    "updatedAt" timestamp without time zone NOT NULL DEFAULT now(),
                     text character varying COLLATE pg_catalog."default" NOT NULL,
                ); 
            `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
