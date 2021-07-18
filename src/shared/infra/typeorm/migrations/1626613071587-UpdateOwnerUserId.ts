import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class UpdateOwnerUserId1626613071587
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('pessoas', 'owner_user_id');
    await queryRunner.addColumn(
      'pessoas',
      new TableColumn({
        name: 'owner_user_id',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('pessoas', 'owner_user_id');
    await queryRunner.addColumn(
      'pessoas',
      new TableColumn({
        name: 'owner_user_id',
        type: 'integer',
        isNullable: true,
      }),
    );
  }
}
