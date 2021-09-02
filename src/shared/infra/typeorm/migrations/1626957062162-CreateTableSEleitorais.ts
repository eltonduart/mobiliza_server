import { MigrationInterface, QueryRunner, Table } from "typeorm";

export default class CreateTableSEleitorais1626957062162
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'secoes',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'zona',
            type: 'varchar',
          },
          {
            name: 'cod_municipio',
            type: 'varchar',
          },
          {
            name: 'municipio',
            type: 'varchar',
          },
          {
            name: 'cod_local',
            type: 'varchar',
          },
          {
            name: 'local_votacao',
            type: 'varchar',
          },
          {
            name: 'endereco',
            type: 'varchar',
          },
          {
            name: 'bairro',
            type: 'varchar',
          },
          {
            name: 'cep',
            type: 'varchar',
          },
          {
            name: 'secaoprincipal',
            type: 'varchar',
          },
          {
            name: 'aptos',
            type: 'integer',
          },
          {
            name: 'secoesagregadas',
            type: 'varchar',
          },
          {
            name: 'aptosagregados',
            type: 'integer',
          },
          {
            name: 'secoesdistribuidas',
            type: 'varchar',
          },
          {
            name: 'aptosdistribuidos',
            type: 'integer',
          },
          {
            name: 'totaleleitoresaptos',
            type: 'integer',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('secoes');
  }
}

