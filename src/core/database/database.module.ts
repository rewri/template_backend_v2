import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MigrationService } from '../shared/services/migration.service';
import { databaseProviders } from './database.provider';

@Module({
  imports: [ConfigModule],
  providers: [...databaseProviders, MigrationService],
  exports: [...databaseProviders, MigrationService],
})
export class DatabaseModule {}
