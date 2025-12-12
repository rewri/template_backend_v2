import { Body, Controller, Param, ParseIntPipe, Put } from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { ApiResponseDto } from 'src/core/shared/dto/api-response.dto';
import { Employee } from '../../shared/entities/employee.entity';
import { UpdateEmployeeDTO } from './update-employee.dto';
import { UpdateEmployeeService } from './update-employee.service';

@ApiTags('employees')
@Controller('employees')
export class UpdateEmployeeController {
  constructor(private readonly updateEmployeeService: UpdateEmployeeService) {}

  @Put(':id')
  @Throttle({ default: { limit: 10, ttl: 60000 } })
  @ApiOperation({ summary: 'Atualizar funcionário existente' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID do funcionário a ser atualizado',
  })
  @ApiBody({ type: UpdateEmployeeDTO })
  @ApiResponse({
    status: 200,
    description: 'Funcionário atualizado com sucesso',
    type: Employee,
  })
  @ApiResponse({
    status: 400,
    description: 'Dados de entrada inválidos',
    type: ApiResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Funcionário não encontrado',
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
  async updateEmployee(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateEmployeeDTO,
  ): Promise<Employee> {
    return this.updateEmployeeService.updateEmployee(id, dto);
  }
}
