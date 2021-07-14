import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddRefCadFieldToPessoa1622378996325
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'pessoas',
      new TableColumn({
        name: 'owner_user_id',
        type: 'integer',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('pessoas', 'owner_user_id');
  }
}
