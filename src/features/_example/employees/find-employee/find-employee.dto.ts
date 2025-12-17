import { Employee } from '../../shared/entities/employee.entity';
import { ExtensionNumber } from '../../shared/entities/extension_number.entity';

export class FindEmployeeResponseDTO {
  id: number;
  name: string;
  email: string;
  extensionNumbers: ExtensionNumber[];
  created_at: Date;
  updated_at: Date;

  static fromEntity(employee: Employee): FindEmployeeResponseDTO {
    const dto = new FindEmployeeResponseDTO();
    dto.id = employee.id;
    dto.name = employee.name;
    dto.email = employee.email;
    dto.extensionNumbers = employee.extensionNumbers || [];
    dto.created_at = employee.created_at;
    dto.updated_at = employee.updated_at;
    return dto;
  }

  static fromEntities(employees: Employee[]): FindEmployeeResponseDTO[] {
    return employees.map((employee) =>
      FindEmployeeResponseDTO.fromEntity(employee),
    );
  }
}
