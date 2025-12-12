import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Employee } from '../../shared/entities/employee.entity';
import { EmployeeRepository } from '../shared/repositories/employee.repository';

@Injectable()
export class FindEmployeeService {
  private readonly logger = new Logger(FindEmployeeService.name);

  constructor(private readonly employeeRepository: EmployeeRepository) {}

  async findEmployee(id: number): Promise<Employee> {
    try {
      const employee = await this.employeeRepository.findByID(id);

      if (!employee) {
        throw new NotFoundException('Funcionário não encontrado');
      }

      return employee;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      this.logger.error('Erro ao buscar funcionário:', {
        id,
        error: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
      });

      throw error;
    }
  }
}
