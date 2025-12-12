import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateEmployeeAndExtensionTables1765460255670 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE \`employees\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`name\` varchar(255) NOT NULL,
                \`email\` varchar(255) NOT NULL,
                \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                PRIMARY KEY (\`id\`),
                UNIQUE KEY \`UQ_employee_email\` (\`email\`),
                KEY \`idx_employee_email\` (\`email\`),
                KEY \`idx_employee_name\` (\`name\`),
                KEY \`idx_employee_name_search\` (\`name\`)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
        `);

    await queryRunner.query(`
            CREATE TABLE \`extension_numbers\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`number\` varchar(20) NOT NULL,
                \`employee_id\` int NOT NULL,
                PRIMARY KEY (\`id\`),
                UNIQUE KEY \`UQ_extension_number\` (\`number\`),
                UNIQUE KEY \`idx_extension_number\` (\`number\`),
                KEY \`idx_extension_employee_id\` (\`employee_id\`),
                KEY \`idx_extension_employee_number\` (\`employee_id\`, \`number\`),
                CONSTRAINT \`FK_extension_employee\` FOREIGN KEY (\`employee_id\`) REFERENCES \`employees\` (\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`extension_numbers\``);
    await queryRunner.query(`DROP TABLE \`employees\``);
  }
}
