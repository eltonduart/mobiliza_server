import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddEmailToPessoas1625418443931
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'pessoas',
      new TableColumn({ name: 'email', type: 'varchar', isNullable: true }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('pessoas', 'email');
  }
}
