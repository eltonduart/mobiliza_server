import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddDistritoToPessoa1626877323991 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'pessoas',
      new TableColumn({
        name: 'distrito_id',
        type: 'integer',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('pessoas', 'distrito_id');
  }
}
