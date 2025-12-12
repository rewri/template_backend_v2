import { ConflictException, NotFoundException } from '@nestjs/common';
import { TestBed, type Mocked } from '@suites/unit';
import { Employee } from '../../shared/entities/employee.entity';
import { ExtensionNumber } from '../../shared/entities/extension_number.entity';
import { EmployeeRepository } from '../shared/repositories/employee.repository';
import { UpdateEmployeeDTO } from './update-employee.dto';
import { UpdateEmployeeService } from './update-employee.service';

describe('UpdateEmployeeService', () => {
  let service: UpdateEmployeeService;
  let repository: Mocked<EmployeeRepository>;

  beforeAll(async () => {
    const { unit, unitRef } = await TestBed.solitary(
      UpdateEmployeeService,
    ).compile();

    service = unit;
    repository = unitRef.get(EmployeeRepository);
  });

  describe('updateEmployee', () => {
    const mockUpdateEmployeeDTO: UpdateEmployeeDTO = {
      name: 'João Silva Santos',
      email: 'joao.santos@email.com',
    };

    const mockEmployee: Employee = {
      id: 1,
      name: 'João Silva',
      email: 'joao@email.com',
      extensionNumbers: Promise.resolve([] as ExtensionNumber[]),
      created_at: new Date(),
      updated_at: new Date(),
    };

    const mockUpdatedEmployee: Employee = {
      ...mockEmployee,
      name: 'João Silva Santos',
      email: 'joao.santos@email.com',
    };

    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should update employee successfully', async () => {
      repository.findByID.mockResolvedValue(mockEmployee);
      repository.findByEmail.mockResolvedValue(null);
      repository.update.mockResolvedValue(mockUpdatedEmployee);
      const result = await service.updateEmployee(1, mockUpdateEmployeeDTO);
      expect(result).toEqual(mockUpdatedEmployee);
    });

    it('should throw NotFoundException when employee not found', async () => {
      repository.findByID.mockResolvedValue(null);
      await expect(
        service.updateEmployee(1, mockUpdateEmployeeDTO),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw ConflictException when email already exists', async () => {
      const anotherEmployee = { ...mockEmployee, id: 2 };
      repository.findByID.mockResolvedValue(mockEmployee);
      repository.findByEmail.mockResolvedValue(anotherEmployee);
      await expect(
        service.updateEmployee(1, mockUpdateEmployeeDTO),
      ).rejects.toThrow(ConflictException);
    });
  });
});
