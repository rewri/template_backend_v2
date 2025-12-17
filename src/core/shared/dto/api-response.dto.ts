import { ApiProperty } from '@nestjs/swagger';

export class ApiResponseDto<T = any> {
  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty({ example: 'Operation completed successfully' })
  message: string;

  @ApiProperty({ required: false })
  data?: T;

  @ApiProperty({ required: false })
  error?: string;
}

export class HealthResponseDto {
  status: string;
  timestamp: string;
}
