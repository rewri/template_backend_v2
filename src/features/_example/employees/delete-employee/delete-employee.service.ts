import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { EmployeeRepository } from '../shared/repositories/employee.repository';

@Injectable()
export class DeleteEmployeeService {
  private readonly logger = new Logger(DeleteEmployeeService.name);

  constructor(private readonly employeeRepository: EmployeeRepository) {}

  async deleteEmployee(id: number): Promise<void> {
    try {
      const existingEmployee = await this.employeeRepository.findByID(id);
      if (!existingEmployee) {
        throw new NotFoundException('Funcionário não encontrado');
      }

      await this.employeeRepository.delete(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      this.logger.error('Erro ao deletar funcionário:', {
        id,
        error: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
      });

      throw new InternalServerErrorException(
        'Erro ao processar solicitação. Tente novamente mais tarde.',
      );
    }
  }
}
