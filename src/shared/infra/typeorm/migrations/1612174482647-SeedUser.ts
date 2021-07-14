import { MigrationInterface, QueryRunner } from 'typeorm';

export default class SeedUser1612174482647 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "insert into users (name,email,password, blocked, created_at, updated_at) values ('admin','admin@email.com','$2a$08$EehERDiwxmPGxl5OSchfwewINga9o2wzVZiYgU1ZR4ucRh0ZTwXiu','false', current_timestamp, current_timestamp)",
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("delete from users where email = 'admin@email'");
  }
}
