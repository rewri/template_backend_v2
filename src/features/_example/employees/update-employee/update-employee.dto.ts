import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsEmail,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class UpdateExtensionNumberDTO {
  @ApiPropertyOptional({
    description: 'Número da extensão telefônica',
    example: '1001',
    type: String,
  })
  @IsString()
  number: string;
}

export class UpdateEmployeeDTO {
  @ApiPropertyOptional({
    description: 'Nome completo do funcionário',
    example: 'João da Silva Santos',
    type: String,
    minLength: 1,
    maxLength: 255,
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    description: 'Email do funcionário',
    example: 'joao.santos@empresa.com',
    format: 'email',
    type: String,
    uniqueItems: true,
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({
    description:
      'Lista de números de extensão do funcionário (substitui todos os existentes)',
    type: [UpdateExtensionNumberDTO],
    example: [{ number: '1003' }, { number: '1004' }],
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateExtensionNumberDTO)
  extensionNumbers?: UpdateExtensionNumberDTO[];
}
