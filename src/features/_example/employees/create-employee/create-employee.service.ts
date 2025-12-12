import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { Employee } from '../../shared/entities/employee.entity';
import { EmployeeRepository } from '../shared/repositories/employee.repository';
import { CreateEmployeeDTO } from './create-employee.dto';

@Injectable()
export class CreateEmployeeService {
  private readonly logger = new Logger(CreateEmployeeService.name);

  constructor(private readonly employeeRepository: EmployeeRepository) {}

  async createEmployee(
    createEmployeeDTO: CreateEmployeeDTO,
  ): Promise<Employee> {
    try {
      const existingEmployee = await this.employeeRepository.findByEmail(
        createEmployeeDTO.email,
      );

      if (existingEmployee) {
        throw new ConflictException('Email já está em uso');
      }

      return await this.employeeRepository.create(createEmployeeDTO);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }

      this.logger.error('Erro ao criar funcionário:', {
        dto: createEmployeeDTO,
        error: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
      });

      throw new InternalServerErrorException(
        'Erro ao processar solicitação. Tente novamente mais tarde.',
      );
    }
  }
}
