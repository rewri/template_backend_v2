import { Type } from 'class-transformer';
import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Employee } from '../../shared/entities/employee.entity';
import { ExtensionNumber } from '../../shared/entities/extension_number.entity';

export class UpdateExtensionNumberDTO {
  @IsString({ message: 'O número da extensão deve ser uma string' })
  @IsNotEmpty({ message: 'O número da extensão não pode estar vazio' })
  number: string;
}

export class UpdateEmployeeDTO {
  @IsOptional()
  @IsString({ message: 'O nome deve ser uma string' })
  @MinLength(1, { message: 'O nome deve ter no mínimo 1 caractere' })
  @MaxLength(255, { message: 'O nome deve ter no máximo 255 caracteres' })
  name?: string;

  @IsOptional()
  @IsEmail({}, { message: 'O email fornecido não é válido' })
  email?: string;

  @IsOptional()
  @IsArray({ message: 'extensionNumbers deve ser um array' })
  @ValidateNested({ each: true })
  @Type(() => UpdateExtensionNumberDTO)
  extensionNumbers?: UpdateExtensionNumberDTO[];
}

export class UpdateEmployeeResponseDTO {
  id: number;
  name: string;
  email: string;
  extensionNumbers: ExtensionNumber[];
  created_at: Date;
  updated_at: Date;

  static fromEntity(employee: Employee): UpdateEmployeeResponseDTO {
    const dto = new UpdateEmployeeResponseDTO();
    dto.id = employee.id;
    dto.name = employee.name;
    dto.email = employee.email;
    dto.extensionNumbers = employee.extensionNumbers || [];
    dto.created_at = employee.created_at;
    dto.updated_at = employee.updated_at;
    return dto;
  }

  static fromEntities(employees: Employee[]): UpdateEmployeeResponseDTO[] {
    return employees.map((employee) =>
      UpdateEmployeeResponseDTO.fromEntity(employee),
    );
  }
}
