import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { HealthResponseDto } from './core/shared/dto/api-response.dto';

@ApiTags('app')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Mensagem de boas vindas' })
  @ApiResponse({
    status: 200,
    description: 'Retorna uma mensagem de boas vindas',
    schema: {
      type: 'string',
      example: 'Hello Backend!',
    },
  })
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('health')
  @ApiOperation({ summary: 'Verificação de integridade' })
  @ApiResponse({
    status: 200,
    description: 'Retorna o status de integridade da aplicação',
    type: HealthResponseDto,
  })
  getHealth(): HealthResponseDto {
    return this.appService.getHealth();
  }
}
