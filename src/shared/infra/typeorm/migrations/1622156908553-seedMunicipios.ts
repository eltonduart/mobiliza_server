import { MigrationInterface, QueryRunner } from 'typeorm';

export default class seedMunicipios1622156908553 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
      insert into municipios (nome,cod_ibge) values ('JUCÁS','2307403');
      insert into municipios (nome,cod_ibge) values ('ACOPIARA','2300309');
      insert into municipios (nome,cod_ibge) values ('IGUATU','2305506');
      insert into municipios (nome,cod_ibge) values ('CARIUS','2303303');
      `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "delete from municipios where cod_ibge in ('2307403','2300309','2305506','2303303')",
    );
  }
}
