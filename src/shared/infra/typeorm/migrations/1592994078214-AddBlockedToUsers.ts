import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddBlockedToUsers1592994078214
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users',
      new TableColumn({ name: 'blocked', type: 'boolean', isNullable: true }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'blocked');
  }
}
