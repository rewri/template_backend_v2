import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsEmail,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class CreateExtensionNumberDTO {
  @ApiProperty({
    description: 'Número da extensão telefônica',
    example: '1001',
    type: String,
  })
  @IsString()
  number: string;
}

export class CreateEmployeeDTO {
  @ApiProperty({
    description: 'Nome completo do funcionário',
    example: 'João da Silva',
    type: String,
    minLength: 1,
    maxLength: 255,
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Email do funcionário',
    example: 'joao.silva@empresa.com',
    format: 'email',
    type: String,
    uniqueItems: true,
  })
  @IsEmail()
  email: string;

  @ApiPropertyOptional({
    description: 'Lista de números de extensão do funcionário',
    type: [CreateExtensionNumberDTO],
    example: [{ number: '1001' }, { number: '1002' }],
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateExtensionNumberDTO)
  extensionNumbers?: CreateExtensionNumberDTO[];
}
