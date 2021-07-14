import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddMaeToPessoa1625418838876 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'pessoas',
      new TableColumn({ name: 'mae', type: 'varchar', isNullable: true }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('pessoas', 'mae');
  }
}
