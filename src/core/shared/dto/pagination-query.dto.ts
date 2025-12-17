import { Type } from 'class-transformer';
import { IsInt, IsOptional, Max, Min } from 'class-validator';

export class PaginationQueryDTO {
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'O número da página deve ser um número inteiro' })
  @Min(1, { message: 'O número da página deve ser no mínimo 1' })
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'O limite deve ser um número inteiro' })
  @Min(1, { message: 'O limite deve ser no mínimo 1' })
  @Max(100, { message: 'O limite deve ser no máximo 100' })
  limit?: number = 10;

  get skip(): number {
    return (this.page - 1) * this.limit;
  }
}
