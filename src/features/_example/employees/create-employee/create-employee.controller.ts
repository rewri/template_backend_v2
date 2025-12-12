import { Body, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiResponseDto } from 'src/core/shared/dto/api-response.dto';
import { Employee } from '../../shared/entities/employee.entity';
import { EmployeesController } from '../employees.controller';
import { CreateEmployeeDTO } from './create-employee.dto';
import { CreateEmployeeService } from './create-employee.service';

@ApiTags('employees')
export class CreateEmployeeController extends EmployeesController {
  constructor(private readonly createEmployeeService: CreateEmployeeService) {
    super();
  }

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
