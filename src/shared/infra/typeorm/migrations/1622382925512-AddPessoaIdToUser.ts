import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddPessoaIdToUser1622382925512
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users',
      new TableColumn({ name: 'pessoa_id', type: 'integer', isNullable: true }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'pessoa_id');
  }
}
