import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

config();

export function createDatabaseConfig(
  configService: ConfigService,
  options: {
    entitiesPath?: string[];
    entities?: any[];
    migrationsPath?: string;
    isRuntime?: boolean;
  } = {},
): DataSourceOptions {
  const {
    entitiesPath = ['src/**/*.entity{.ts,.js}'],
    entities = [],
    migrationsPath = 'src/core/database/migrations/*{.ts,.js}',
    isRuntime = false,
  } = options;

  return {
    type: 'mysql',
    host: configService.getOrThrow('MARIADB_HOST'),
    port: +configService.getOrThrow('MARIADB_PORT'),
    username: configService.getOrThrow('MARIADB_USER'),
    password: configService.getOrThrow('MARIADB_PASSWORD'),
    database: configService.getOrThrow('MARIADB_DATABASE'),
    entities: isRuntime ? entities : entitiesPath,
    migrations: [
      isRuntime ? 'dist/core/database/migrations/*{.ts,.js}' : migrationsPath,
    ],
    migrationsTableName: 'migrations',
    timezone: 'America/Sao_Paulo',
    synchronize: false,
    logging: configService.get('NODE_ENV') === 'development',
    extra: {
      trustServerCertificate: true,
      ...(configService.get('MARIADB_SSL') === 'true' && {
        ssl: {
          rejectUnauthorized: false,
        },
      }),
    },
  };
}

// Configuration for TypeORM CLI commands
const configService = new ConfigService();
export const AppDataSource = new DataSource(
  createDatabaseConfig(configService, {
    entitiesPath: ['src/**/*.entity{.ts,.js}'],
    migrationsPath: 'src/core/database/migrations/*{.ts,.js}',
    isRuntime: false,
  }),
);

export default AppDataSource;
