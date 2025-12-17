import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class PaginationMetaDTO {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export class PaginationResponseDTO<T> {
  @ApiProperty({ isArray: true })
  data: T[];

  @ApiProperty({ type: () => PaginationMetaDTO })
  @Type(() => PaginationMetaDTO)
  meta: PaginationMetaDTO;

  constructor(data: T[], meta: PaginationMetaDTO) {
    this.data = data;
    this.meta = meta;
  }
}
