const { DataSource } = require('typeorm');
require('dotenv').config();

const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.MARIADB_HOST,
  port: parseInt(process.env.MARIADB_PORT),
  username: process.env.MARIADB_USER,
  password: process.env.MARIADB_PASSWORD,
  database: process.env.MARIADB_DATABASE,
  entities: ['src/**/*.entity.ts'],
  migrations: ['src/core/database/migrations/*.ts'],
  migrationsTableName: 'migrations',
  synchronize: false,
  logging: process.env.NODE_ENV === 'development',
  extra: {
    ...(process.env.MARIADB_SSL === 'true' && {
      ssl: {
        rejectUnauthorized: false,
      },
    }),
  },
});

module.exports = AppDataSource;
