import { NotFoundException } from '@nestjs/common';
import { TestBed, type Mocked } from '@suites/unit';
import { Employee } from '../../shared/entities/employee.entity';
import { ExtensionNumber } from '../../shared/entities/extension_number.entity';
import { EmployeeRepository } from '../shared/repositories/employee.repository';
import { FindEmployeeService } from './find-employee.service';

describe('FindEmployeeService', () => {
  let service: FindEmployeeService;
  let repository: Mocked<EmployeeRepository>;

  beforeAll(async () => {
    const { unit, unitRef } =
      await TestBed.solitary(FindEmployeeService).compile();

    service = unit;
    repository = unitRef.get(EmployeeRepository);
  });

  describe('findEmployee', () => {
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

    it('should find employee successfully', async () => {
      repository.findByID.mockResolvedValue(mockEmployee);
      const result = await service.findEmployee(1);
      expect(result).toEqual(mockEmployee);
    });

    it('should throw NotFoundException when employee not found', async () => {
      repository.findByID.mockResolvedValue(null);
      await expect(service.findEmployee(1)).rejects.toThrow(NotFoundException);
    });
  });
});
