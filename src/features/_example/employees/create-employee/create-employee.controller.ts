import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiResponseDto } from 'src/core/shared/dto/api-response.dto';
import { Employee } from '../../shared/entities/employee.entity';
import { CreateEmployeeDTO } from './create-employee.dto';
import { CreateEmployeeService } from './create-employee.service';

@ApiTags('employees')
@Controller('employees')
export class CreateEmployeeController {
  constructor(private readonly createEmployeeService: CreateEmployeeService) {}

  @Post('')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Criar novo funcionário' })
  @ApiBody({ type: CreateEmployeeDTO })
  @ApiResponse({
    status: 201,
    description: 'Funcionário criado com sucesso',
    type: Employee,
  })
  @ApiResponse({
    status: 400,
    description: 'Dados de entrada inválidos',
    type: ApiResponseDto,
  })
  @ApiResponse({
    status: 409,
    description: 'Email já está em uso',
    type: ApiResponseDto,
  })
  @ApiResponse({
    status: 500,
    description: 'Erro interno do servidor',
    type: ApiResponseDto,
  })
  async createEmployee(@Body() dto: CreateEmployeeDTO): Promise<Employee> {
    return this.createEmployeeService.createEmployee(dto);
  }
}
