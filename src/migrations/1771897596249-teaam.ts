import { MigrationInterface, QueryRunner } from 'typeorm';

export class teaam1771897596249 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
                CREATE TABLE IF NOT EXISTS public."team"
                (
                    id integer NOT NULL DEFAULT nextval('team_id_seq'::regclass),
                    created_at timestamp without time zone NOT NULL DEFAULT now(),
                    updated_at timestamp without time zone NOT NULL DEFAULT now(),
                    name character varying COLLATE pg_catalog."default" NOT NULL,
                    owner character varying COLLATE pg_catalog."default" NOT NULL,
                    creator_id integer NOT NULL,
                    CONSTRAINT "PK_be5fda3aac270b134ff9c21cdee" PRIMARY KEY (id),
                    CONSTRAINT "FK_9e91e6a24261b66f53971d3f96b" FOREIGN KEY (creator_id)
                        REFERENCES public."user" (id) MATCH SIMPLE
                        ON UPDATE NO ACTION
                        ON DELETE NO ACTION
                ); 
            `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
