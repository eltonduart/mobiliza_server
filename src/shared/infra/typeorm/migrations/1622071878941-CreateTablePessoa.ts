import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateTablePessoa1622071878941
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'pessoas',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'nome',
            type: 'varchar',
          },
          {
            name: 'apelido',
            type: 'varchar',
          },
          {
            name: 'endereco',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'telefone',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'dta_nascimento',
            type: 'date',
            isNullable: true,
          },
          {
            name: 'whatsapp',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'instagran',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'facebook',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'titulo',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'zona_eleitoral',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'secao_eleitoral',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'tipo_usuario',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'municipio_id',
            type: 'integer',
            isNullable: true,
          },
          {
            name: 'status',
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
    await queryRunner.dropTable('pessoas');
  }
}
