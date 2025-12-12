import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiResponseDto } from 'src/core/shared/dto/api-response.dto';
import { DeleteEmployeeService } from './delete-employee.service';

@ApiTags('employees')
@Controller('employees')
export class DeleteEmployeeController {
  constructor(private readonly deleteEmployeeService: DeleteEmployeeService) {}

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Deletar funcionário por ID' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID do funcionário a ser deletado',
  })
  @ApiResponse({
    status: 204,
    description: 'Funcionário deletado com sucesso',
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
  async deleteEmployee(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.deleteEmployeeService.deleteEmployee(id);
  }
}
