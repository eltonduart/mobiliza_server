import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateTableOcorrencia1629310683881
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'ocorrencias',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'pessoa_id',
            type: 'integer',
          },
          {
            name: 'descricao',
            type: 'varchar',
          },
          {
            name: 'dta_previsao',
            type: 'date',
          },
          {
            name: 'concluida',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('ocorrencias');
  }
}
