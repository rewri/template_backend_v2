import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, Max, Min } from 'class-validator';

export class PaginationQueryDTO {
  @ApiPropertyOptional({
    description: 'Número da página para paginação',
    example: 1,
    minimum: 1,
    default: 1,
    type: Number,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({
    description: 'Número de itens por página',
    example: 10,
    minimum: 1,
    maximum: 100,
    default: 10,
    type: Number,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number = 10;

  get skip(): number {
    return (this.page - 1) * this.limit;
  }
}
