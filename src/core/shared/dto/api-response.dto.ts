import { ApiProperty } from '@nestjs/swagger';

export class ApiResponseDto<T = any> {
  @ApiProperty({
    description: 'Indicates if the request was successful',
    example: true,
  })
  success: boolean;

  @ApiProperty({
    description: 'Response message',
    example: 'Operation completed successfully',
  })
  message: string;

  @ApiProperty({
    description: 'Response data',
    required: false,
  })
  data?: T;

  @ApiProperty({
    description: 'Error details (present when success is false)',
    required: false,
  })
  error?: string;
}

export class HealthResponseDto {
  @ApiProperty({
    description: 'Application status',
    example: 'ok',
  })
  status: string;

  @ApiProperty({
    description: 'Timestamp of the health check',
    example: '2024-12-09T12:00:00.000Z',
  })
  timestamp: string;
}
