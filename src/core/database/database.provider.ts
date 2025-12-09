import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { createDatabaseConfig } from './ormconfig';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async (configService: ConfigService) => {
      const config = createDatabaseConfig(configService, {
        entities: [],
        migrationsPath: 'dist/core/database/migrations/*{.ts,.js}',
        isRuntime: true,
      });
      const dataSource = new DataSource(config);
      return dataSource.initialize();
    },
    inject: [ConfigService],
  },
];
