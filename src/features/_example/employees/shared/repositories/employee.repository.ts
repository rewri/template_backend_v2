import { Inject, Injectable } from '@nestjs/common';
import { PaginationQueryDTO } from 'src/core/shared/dto/pagination-query.dto';
import { DataSource, Repository } from 'typeorm';
import { Employee } from '../../../shared/entities/employee.entity';
import { ExtensionNumber } from '../../../shared/entities/extension_number.entity';
import { CreateEmployeeDTO } from '../../create-employee/create-employee.dto';
import { UpdateEmployeeDTO } from '../../update-employee/update-employee.dto';

@Injectable()
export class EmployeeRepository {
  private employeeRepository: Repository<Employee>;
  private extensionNumberRepository: Repository<ExtensionNumber>;

  constructor(@Inject('DATA_SOURCE') private dataSource: DataSource) {
    this.employeeRepository = this.dataSource.getRepository(Employee);
    this.extensionNumberRepository =
      this.dataSource.getRepository(ExtensionNumber);
  }

  async create(data: CreateEmployeeDTO): Promise<Employee> {
    return await this.dataSource.transaction(async (manager) => {
      const employee = this.employeeRepository.create({
        name: data.name,
        email: data.email,
      });
      const savedEmployee = await manager.save(Employee, employee);
      if (data.extensionNumbers && data.extensionNumbers.length > 0) {
        const extensionNumbers = data.extensionNumbers.map((ext) =>
          this.extensionNumberRepository.create({
            number: ext.number,
            employee_id: savedEmployee.id,
          }),
        );
        await manager.save(ExtensionNumber, extensionNumbers);
      }

      return savedEmployee;
    });
  }

  async findAll(): Promise<Employee[]> {
    return await this.employeeRepository.find();
  }

  async findAllPaginated(
    query: PaginationQueryDTO,
    search?: string,
    email?: string,
  ): Promise<{ data: Employee[]; total: number }> {
    const queryBuilder = this.employeeRepository.createQueryBuilder('employee');

    if (search) {
      queryBuilder.where(
        'employee.name LIKE :search OR employee.email LIKE :search',
        {
          search: `%${search}%`,
        },
      );
    }

    if (email) {
      queryBuilder.andWhere('employee.email = :email', { email });
    }

    const [data, total] = await queryBuilder
      .skip(query.skip)
      .take(query.limit)
      .getManyAndCount();

    return { data, total };
  }

  async findByEmail(email: string): Promise<Employee | null> {
    return await this.employeeRepository.findOne({ where: { email } });
  }

  async findByID(id: number): Promise<Employee | null> {
    return await this.employeeRepository.findOne({ where: { id } });
  }

  async update(id: number, data: UpdateEmployeeDTO): Promise<Employee> {
    return await this.dataSource.transaction(async (manager) => {
      const employee = await this.findByID(id);
      if (!employee) {
        throw new Error('Funcionário não encontrado');
      }

      // Verifica se o email está sendo alterado e se já existe
      if (data.email && data.email !== employee.email) {
        const existingEmployee = await this.findByEmail(data.email);
        if (existingEmployee) {
          throw new Error('Email já está em uso');
        }
      }

      // Atualiza os dados básicos do funcionário
      await manager.update(Employee, id, {
        ...(data.name && { name: data.name }),
        ...(data.email && { email: data.email }),
      });

      // Gerencia extension numbers se fornecidos
      if (data.extensionNumbers !== undefined) {
        // Remove extension numbers existentes
        await manager.delete(ExtensionNumber, { employee_id: id });

        // Adiciona novos extension numbers se houver
        if (data.extensionNumbers.length > 0) {
          const extensionNumbers = data.extensionNumbers.map((ext) =>
            this.extensionNumberRepository.create({
              number: ext.number,
              employee_id: id,
            }),
          );
          await manager.save(ExtensionNumber, extensionNumbers);
        }
      }

      // Retorna o funcionário atualizado usando o manager da transação
      const updatedEmployee = await manager.findOne(Employee, {
        where: { id },
      });
      if (!updatedEmployee) {
        throw new Error('Erro ao recuperar funcionário atualizado');
      }
      return updatedEmployee;
    });
  }

  async delete(id: number): Promise<void> {
    return await this.dataSource.transaction(async (manager) => {
      const employee = await this.findByID(id);
      if (!employee) {
        throw new Error('Funcionário não encontrado');
      }

      // Remove extension numbers primeiro (cascade deve fazer isso automaticamente, mas para garantir)
      await manager.delete(ExtensionNumber, { employee_id: id });

      // Remove o funcionário
      await manager.delete(Employee, { id });
    });
  }
}
