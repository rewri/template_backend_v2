import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveUniqueConstraintFromExtensionNumber1765991451968 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`idx_extension_number\` ON \`extension_numbers\``,
    );

    await queryRunner.query(
      `ALTER TABLE \`extension_numbers\` MODIFY \`number\` varchar(20) NOT NULL`,
    );

    await queryRunner.query(
      `CREATE INDEX \`idx_extension_number\` ON \`extension_numbers\` (\`number\`)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`idx_extension_number\` ON \`extension_numbers\``,
    );

    await queryRunner.query(
      `ALTER TABLE \`extension_numbers\` MODIFY \`number\` varchar(20) NOT NULL UNIQUE`,
    );

    await queryRunner.query(
      `CREATE UNIQUE INDEX \`idx_extension_number\` ON \`extension_numbers\` (\`number\`)`,
    );
  }
}
