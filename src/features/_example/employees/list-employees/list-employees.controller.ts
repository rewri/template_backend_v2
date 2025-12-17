import { Get, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { ApiResponseDto } from 'src/core/shared/dto/api-response.dto';
import { PaginationResponseDTO } from 'src/core/shared/dto/pagination-response.dto';
import { Employee } from '../../shared/entities/employee.entity';
import { EmployeesController } from '../employees.controller';
import { ListEmployeesQueryDTO } from './list-employees.dto';
import { ListEmployeesService } from './list-employees.service';

@ApiTags('employees')
export class ListEmployeesController extends EmployeesController {
  constructor(private readonly listEmployeesService: ListEmployeesService) {
    super();
  }

  @Get('')
  @Throttle({ default: { limit: 20, ttl: 60000 } })
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
      type: 'object',
      properties: {
        data: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'number', example: 1 },
              name: { type: 'string', example: 'João da Silva' },
              email: { type: 'string', example: 'joao@email.com' },
              extensionNumbers: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: { type: 'number', example: 1 },
                    number: { type: 'string', example: '1001' },
                  },
                },
              },
              created_at: { type: 'string', format: 'date-time' },
              updated_at: { type: 'string', format: 'date-time' },
            },
          },
        },
        meta: {
          type: 'object',
          properties: {
            page: { type: 'number', example: 1 },
            limit: { type: 'number', example: 10 },
            total: { type: 'number', example: 25 },
            totalPages: { type: 'number', example: 3 },
            hasNextPage: { type: 'boolean', example: true },
            hasPreviousPage: { type: 'boolean', example: false },
          },
        },
      },
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
