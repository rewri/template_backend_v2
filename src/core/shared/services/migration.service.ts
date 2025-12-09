import {
  Inject,
  Injectable,
  Logger,
  OnApplicationBootstrap,
} from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class MigrationService implements OnApplicationBootstrap {
  private readonly logger = new Logger(MigrationService.name);

  constructor(@Inject('DATA_SOURCE') private dataSource: DataSource) {}

  async onApplicationBootstrap() {
    if (
      process.env.NODE_ENV === 'development' &&
      process.env.RUN_MIGRATIONS === 'true'
    ) {
      await this.runMigrations();
    }
  }

  async runMigrations(): Promise<void> {
    try {
      this.logger.log('Running pending migrations...');
      await this.dataSource.runMigrations();
      this.logger.log('Migrations completed successfully');
    } catch (error) {
      this.logger.error('Failed to run migrations', error);
      throw error;
    }
  }

  async revertLastMigration(): Promise<void> {
    try {
      this.logger.log('Reverting last migration...');
      await this.dataSource.undoLastMigration();
      this.logger.log('Migration reverted successfully');
    } catch (error) {
      this.logger.error('Failed to revert migration', error);
      throw error;
    }
  }

  async showMigrations(): Promise<void> {
    try {
      const migrations = await this.dataSource.showMigrations();
      this.logger.log(
        `Migrations status: ${migrations ? 'Pending migrations exist' : 'All migrations executed'}`,
      );
    } catch (error) {
      this.logger.error('Failed to check migration status', error);
      throw error;
    }
  }
}
