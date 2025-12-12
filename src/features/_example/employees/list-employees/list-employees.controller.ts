import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiResponseDto } from 'src/core/shared/dto/api-response.dto';
import { PaginationResponseDTO } from 'src/core/shared/dto/pagination-response.dto';
import { Employee } from '../../shared/entities/employee.entity';
import { ListEmployeesQueryDTO } from './list-employees.dto';
import { ListEmployeesService } from './list-employees.service';

@ApiTags('employees')
@Controller('employees')
export class ListEmployeesController {
  constructor(private readonly listEmployeesService: ListEmployeesService) {}

  @Get('')
  @ApiOperation({ summary: 'Listar funcionários com paginação' })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Número da página (padrão: 1)',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Itens por página (padrão: 10, máximo: 100)',
  })
  @ApiQuery({
    name: 'search',
    required: false,
    type: String,
    description: 'Buscar por nome ou email',
  })
  @ApiQuery({
    name: 'email',
    required: false,
    type: String,
    description: 'Filtrar por email específico',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de funcionários recuperada com sucesso',
    schema: {
      allOf: [
        { $ref: '#/components/schemas/PaginationResponseDTO' },
        {
          properties: {
            data: {
              type: 'array',
              items: { $ref: '#/components/schemas/Employee' },
            },
          },
        },
      ],
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Parâmetros de consulta inválidos',
    type: ApiResponseDto,
  })
  @ApiResponse({
    status: 500,
    description: 'Erro interno do servidor',
    type: ApiResponseDto,
  })
  async listEmployees(
    @Query() query: ListEmployeesQueryDTO,
  ): Promise<PaginationResponseDTO<Employee>> {
    return this.listEmployeesService.listEmployees(query);
  }
}
