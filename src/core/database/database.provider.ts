import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { Employee } from '../../features/_example/shared/entities/employee.entity';
import { ExtensionNumber } from '../../features/_example/shared/entities/extension_number.entity';
import { createDatabaseConfig } from './ormconfig';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async (configService: ConfigService) => {
      const config = createDatabaseConfig(configService, {
        entities: [Employee, ExtensionNumber],
        migrationsPath: 'dist/core/database/migrations/*{.ts,.js}',
        isRuntime: true,
      });
      const dataSource = new DataSource(config);
      return dataSource.initialize();
    },
    inject: [ConfigService],
  },
];
