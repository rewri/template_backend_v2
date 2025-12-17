import { NotFoundException } from '@nestjs/common';
import { TestBed, type Mocked } from '@suites/unit';
import { Employee } from '../../shared/entities/employee.entity';
import { ExtensionNumber } from '../../shared/entities/extension_number.entity';
import { EmployeeRepository } from '../shared/repositories/employee.repository';
import { DeleteEmployeeService } from './delete-employee.service';

describe('DeleteEmployeeService', () => {
  let service: DeleteEmployeeService;
  let repository: Mocked<EmployeeRepository>;

  beforeAll(async () => {
    const { unit, unitRef } = await TestBed.solitary(
      DeleteEmployeeService,
    ).compile();

    service = unit;
    repository = unitRef.get(EmployeeRepository);
  });

  describe('deleteEmployee', () => {
    const mockEmployee: Employee = {
      id: 1,
      name: 'João Silva',
      email: 'joao@email.com',
      extensionNumbers: [] as ExtensionNumber[],
      created_at: new Date(),
      updated_at: new Date(),
    };

    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should delete employee successfully', async () => {
      repository.findByID.mockResolvedValue(mockEmployee);
      repository.delete.mockResolvedValue(undefined);
      await service.deleteEmployee(1);
      expect(repository.delete).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException when employee not found', async () => {
      repository.findByID.mockResolvedValue(null);
      await expect(service.deleteEmployee(1)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
