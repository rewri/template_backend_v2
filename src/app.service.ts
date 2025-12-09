import { Injectable } from '@nestjs/common';
import { HealthResponseDto } from './core/shared/dto/api-response.dto';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello Backend!';
  }

  getHealth(): HealthResponseDto {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
    };
  }
}
