import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { EmployeeRepository } from '../shared/repositories/employee.repository';
import {
  UpdateEmployeeDTO,
  UpdateEmployeeResponseDTO,
} from './update-employee.dto';

@Injectable()
export class UpdateEmployeeService {
  private readonly logger = new Logger(UpdateEmployeeService.name);

  constructor(private readonly employeeRepository: EmployeeRepository) {}

  async updateEmployee(
    id: number,
    updateEmployeeDTO: UpdateEmployeeDTO,
  ): Promise<UpdateEmployeeResponseDTO> {
    try {
      const existingEmployee = await this.employeeRepository.findByID(id);
      if (!existingEmployee) {
        throw new NotFoundException('Funcionário não encontrado');
      }

      if (
        updateEmployeeDTO.email &&
        updateEmployeeDTO.email !== existingEmployee.email
      ) {
        const employeeWithEmail = await this.employeeRepository.findByEmail(
          updateEmployeeDTO.email,
        );
        if (employeeWithEmail) {
          throw new ConflictException('Email já está em uso');
        }
      }

      const employee = await this.employeeRepository.update(
        id,
        updateEmployeeDTO,
      );
      return UpdateEmployeeResponseDTO.fromEntity(employee);
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof ConflictException
      ) {
        throw error;
      }

      this.logger.error('Erro ao atualizar funcionário:', {
        id,
        dto: updateEmployeeDTO,
        error: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
      });

      throw new InternalServerErrorException(
        'Erro ao processar solicitação. Tente novamente mais tarde.',
      );
    }
  }
}
