import { MigrationInterface, QueryRunner } from 'typeorm';
import * as bcrypt from 'bcryptjs';

export class CreateRootUser1731862558037 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS "users" (
            id SERIAL PRIMARY KEY,
            username VARCHAR(255) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            role VARCHAR(50) NOT NULL,
            created_at TIMESTAMP DEFAULT now(),
            updated_at TIMESTAMP DEFAULT now()
        );
    `);

    const hashedPassword = await bcrypt.hash('rootpassword', 10);

    await queryRunner.query(
      `
        INSERT INTO "users" (username, password, role)
        VALUES ($1, $2, $3);
    `,
      ['root', hashedPassword, 'Admin'],
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
        DELETE FROM "users" WHERE username = $1;
    `,
      ['root'],
    );
  }
}
