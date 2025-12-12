import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiResponseDto } from 'src/core/shared/dto/api-response.dto';
import { Employee } from '../../shared/entities/employee.entity';
import { FindEmployeeService } from './find-employee.service';

@ApiTags('employees')
@Controller('employees')
export class FindEmployeeController {
  constructor(private readonly findEmployeeService: FindEmployeeService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Buscar funcionário por ID' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID do funcionário a ser buscado',
  })
  @ApiResponse({
    status: 200,
    description: 'Funcionário encontrado com sucesso',
    type: Employee,
  })
  @ApiResponse({
    status: 404,
    description: 'Funcionário não encontrado',
    type: ApiResponseDto,
  })
  @ApiResponse({
    status: 500,
    description: 'Erro interno do servidor',
    type: ApiResponseDto,
  })
  async findEmployee(@Param('id', ParseIntPipe) id: number): Promise<Employee> {
    return this.findEmployeeService.findEmployee(id);
  }
}
