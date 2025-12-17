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

export class CreateExtensionNumberDTO {
  @IsString({ message: 'O número da extensão deve ser uma string' })
  @IsNotEmpty({ message: 'O número da extensão não pode estar vazio' })
  number: string;
}

export class CreateEmployeeDTO {
  @IsString({ message: 'O nome deve ser uma string' })
  @IsNotEmpty({ message: 'O nome não pode estar vazio' })
  @MinLength(1, { message: 'O nome deve ter no mínimo 1 caractere' })
  @MaxLength(255, { message: 'O nome deve ter no máximo 255 caracteres' })
  name: string;

  @IsEmail({}, { message: 'O email fornecido não é válido' })
  @IsNotEmpty({ message: 'O email não pode estar vazio' })
  email: string;

  @IsOptional()
  @IsArray({ message: 'extensionNumbers deve ser um array' })
  @ValidateNested({ each: true })
  @Type(() => CreateExtensionNumberDTO)
  extensionNumbers?: CreateExtensionNumberDTO[];
}

export class CreateEmployeeResponseDTO {
  id: number;
  name: string;
  email: string;
  extensionNumbers: ExtensionNumber[];
  created_at: Date;
  updated_at: Date;

  static fromEntity(employee: Employee): CreateEmployeeResponseDTO {
    const dto = new CreateEmployeeResponseDTO();
    dto.id = employee.id;
    dto.name = employee.name;
    dto.email = employee.email;
    dto.extensionNumbers = employee.extensionNumbers || [];
    dto.created_at = employee.created_at;
    dto.updated_at = employee.updated_at;
    return dto;
  }

  static fromEntities(employees: Employee[]): CreateEmployeeResponseDTO[] {
    return employees.map((employee) =>
      CreateEmployeeResponseDTO.fromEntity(employee),
    );
  }
}
