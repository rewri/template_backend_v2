import { IsEmail, IsOptional, IsString } from 'class-validator';
import { PaginationQueryDTO } from 'src/core/shared/dto/pagination-query.dto';
import { Employee } from '../../shared/entities/employee.entity';
import { ExtensionNumber } from '../../shared/entities/extension_number.entity';

export class ExtensionNumberResponseDTO {
  id: number;
  number: string;
}

export class ListEmployeeDTO {
  id: number;
  name: string;
  email: string;
  extensionNumbers: ExtensionNumber[];
  created_at: Date;
  updated_at: Date;

  static fromEntity(employee: Employee): ListEmployeeDTO {
    const dto = new ListEmployeeDTO();
    dto.id = employee.id;
    dto.name = employee.name;
    dto.email = employee.email;
    dto.extensionNumbers = employee.extensionNumbers || [];
    dto.created_at = employee.created_at;
    dto.updated_at = employee.updated_at;
    return dto;
  }

  static fromEntities(employees: Employee[]): ListEmployeeDTO[] {
    return employees.map((employee) => ListEmployeeDTO.fromEntity(employee));
  }
}

export class ListEmployeesQueryDTO extends PaginationQueryDTO {
  @IsOptional()
  @IsString({ message: 'O parâmetro de busca deve ser uma string' })
  search?: string;

  @IsOptional()
  @IsEmail({}, { message: 'O email fornecido para filtro não é válido' })
  email?: string;
}
