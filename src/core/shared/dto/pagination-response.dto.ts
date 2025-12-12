import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class PaginationMetaDTO {
  @ApiProperty({
    description: 'Página atual',
    example: 1,
    type: Number,
  })
  page: number;

  @ApiProperty({
    description: 'Número de itens por página',
    example: 10,
    type: Number,
  })
  limit: number;

  @ApiProperty({
    description: 'Total de itens encontrados',
    example: 25,
    type: Number,
  })
  total: number;

  @ApiProperty({
    description: 'Total de páginas disponíveis',
    example: 3,
    type: Number,
  })
  totalPages: number;

  @ApiProperty({
    description: 'Indica se existe uma próxima página',
    example: true,
    type: Boolean,
  })
  hasNextPage: boolean;

  @ApiProperty({
    description: 'Indica se existe uma página anterior',
    example: false,
    type: Boolean,
  })
  hasPreviousPage: boolean;
}

export class PaginationResponseDTO<T> {
  @ApiProperty({
    description: 'Array com os dados da página atual',
    isArray: true,
  })
  data: T[];

  @ApiProperty({
    description: 'Metadados da paginação',
    type: PaginationMetaDTO,
  })
  @Type(() => PaginationMetaDTO)
  meta: PaginationMetaDTO;

  constructor(data: T[], meta: PaginationMetaDTO) {
    this.data = data;
    this.meta = meta;
  }
}
