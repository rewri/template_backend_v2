import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEmail, IsOptional, IsString } from 'class-validator';
import { PaginationQueryDTO } from 'src/core/shared/dto/pagination-query.dto';

export class ExtensionNumberResponseDTO {
  @ApiProperty({
    description: 'ID único da extensão',
    example: 1,
    type: Number,
  })
  id: number;

  @ApiProperty({
    description: 'Número da extensão telefônica',
    example: '1001',
    type: String,
  })
  number: string;
}

export class ListEmployeeDTO {
  @ApiProperty({
    description: 'ID único do funcionário',
    example: 1,
    type: Number,
  })
  id: number;

  @ApiProperty({
    description: 'Nome completo do funcionário',
    example: 'João da Silva',
    type: String,
  })
  name: string;

  @ApiProperty({
    description: 'Email único do funcionário',
    example: 'joao.silva@empresa.com',
    format: 'email',
    type: String,
  })
  email: string;

  @ApiPropertyOptional({
    description: 'Lista de números de extensão do funcionário',
    type: [ExtensionNumberResponseDTO],
    example: [
      { id: 1, number: '1001' },
      { id: 2, number: '1002' },
    ],
  })
  @Type(() => ExtensionNumberResponseDTO)
  extensionNumbers?: ExtensionNumberResponseDTO[];

  @ApiProperty({
    description: 'Data de criação do registro',
    example: '2024-12-09T12:00:00.000Z',
    type: Date,
  })
  created_at: Date;

  @ApiProperty({
    description: 'Data da última atualização do registro',
    example: '2024-12-09T12:00:00.000Z',
    type: Date,
  })
  updated_at: Date;
}

export class ListEmployeesQueryDTO extends PaginationQueryDTO {
  @ApiPropertyOptional({
    description: 'Buscar por nome ou email do funcionário',
    example: 'João da Silva',
    type: String,
  })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({
    description: 'Filtrar por email específico',
    example: 'joao.silva@empresa.com',
    format: 'email',
    type: String,
  })
  @IsOptional()
  @IsEmail()
  email?: string;
}
