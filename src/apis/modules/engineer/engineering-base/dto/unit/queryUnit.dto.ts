import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class QueryUnit {
  @ApiPropertyOptional()
  @IsOptional()
  projects_id: string;
}
