import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class QuerySparePart {
  @ApiPropertyOptional({ description: 'Filter by projects_id' })
  @IsOptional()
  projects_id: string;
  @ApiPropertyOptional({ description: 'Filter by code' })
  @IsOptional()
  code: string;
  @ApiPropertyOptional({ description: 'Filter by title' })
  @IsOptional()
  title: string;
  @ApiPropertyOptional({ description: 'Filter by unit_id' })
  @IsOptional()
  unit_id: string;
  @ApiPropertyOptional({ description: 'Filter by quantity_min' })
  @IsOptional()
  quantity_min: number;
  @ApiPropertyOptional({ description: 'Filter by quantity_max' })
  @IsOptional()
  quantity_max: number;
}
