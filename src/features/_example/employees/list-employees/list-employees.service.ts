import { Injectable, Logger } from '@nestjs/common';
import { PaginationResponseDTO } from 'src/core/shared/dto/pagination-response.dto';
import { PaginationHelper } from 'src/core/shared/helpers/pagination.helper';
import { Employee } from '../../shared/entities/employee.entity';
import { EmployeeRepository } from '../shared/repositories/employee.repository';
import { ListEmployeesQueryDTO } from './list-employees.dto';

@Injectable()
export class ListEmployeesService {
  private readonly logger = new Logger(ListEmployeesService.name);

  constructor(private readonly employeeRepository: EmployeeRepository) {}

  async listEmployees(
    query: ListEmployeesQueryDTO,
  ): Promise<PaginationResponseDTO<Employee>> {
    try {
      const { data, total } = await this.employeeRepository.findAllPaginated(
        query,
        query.search,
        query.email,
      );

      return PaginationHelper.createResponse(data, total, query);
    } catch (error) {
      this.logger.error('Erro ao listar funcionários:', {
        query,
        error: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
      });

      throw error;
    }
  }
}
