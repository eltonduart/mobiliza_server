import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddBairroToPessoa1629152720812 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'pessoas',
      new TableColumn({
        name: 'bairro',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('pessoas', 'bairro');
  }
}
