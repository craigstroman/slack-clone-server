import { MigrationInterface, QueryRunner } from 'typeorm';

export class Team1769792716606 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
                CREATE TABLE IF NOT EXISTS public."user"
                (
                    id integer NOT NULL DEFAULT nextval('user_id_seq'::regclass),
                    created_at timestamp without time zone NOT NULL DEFAULT now(),
                    updated_at timestamp without time zone NOT NULL DEFAULT now(),
                    name character varying COLLATE pg_catalog."default" NOT NULL,
                    owner character varying COLLATE pg_catalog."default" NOT NULL,
                ); 
            `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
