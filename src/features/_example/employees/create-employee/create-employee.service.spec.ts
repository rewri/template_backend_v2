import { ConflictException } from '@nestjs/common';
import { TestBed, type Mocked } from '@suites/unit';
import { Employee } from '../../shared/entities/employee.entity';
import { ExtensionNumber } from '../../shared/entities/extension_number.entity';
import { EmployeeRepository } from '../shared/repositories/employee.repository';
import { CreateEmployeeDTO } from './create-employee.dto';
import { CreateEmployeeService } from './create-employee.service';

describe('CreateEmployeeService', () => {
  let service: CreateEmployeeService;
  let repository: Mocked<EmployeeRepository>;

  beforeAll(async () => {
    const { unit, unitRef } = await TestBed.solitary(
      CreateEmployeeService,
    ).compile();

    service = unit;
    repository = unitRef.get(EmployeeRepository);
  });

  describe('createEmployee', () => {
    const mockCreateEmployeeDTO: CreateEmployeeDTO = {
      name: 'João Silva',
      email: 'joao@email.com',
    };

    const mockEmployee: Employee = {
      id: 1,
      name: 'João Silva',
      email: 'joao@email.com',
      extensionNumbers: Promise.resolve([] as ExtensionNumber[]),
      created_at: new Date(),
      updated_at: new Date(),
    };

    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should create employee successfully', async () => {
      repository.findByEmail.mockResolvedValue(null);
      repository.create.mockResolvedValue(mockEmployee);
      const result = await service.createEmployee(mockCreateEmployeeDTO);
      expect(result).toEqual(mockEmployee);
    });

    it('should throw ConflictException when email already exists', async () => {
      repository.findByEmail.mockResolvedValue(mockEmployee);
      await expect(
        service.createEmployee(mockCreateEmployeeDTO),
      ).rejects.toThrow(ConflictException);
    });
  });
});
