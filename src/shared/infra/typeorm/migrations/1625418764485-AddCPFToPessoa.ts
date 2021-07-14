import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddCPFToPessoa1625418764485 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'pessoas',
      new TableColumn({ name: 'cpf', type: 'varchar', isNullable: true }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('pessoas', 'cpf');
  }
}
