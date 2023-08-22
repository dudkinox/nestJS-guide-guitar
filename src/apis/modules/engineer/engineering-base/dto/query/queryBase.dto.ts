import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class QueryBaseDto {
  @ApiPropertyOptional({ description: 'Filter by engineer_service_area_id' })
  @IsOptional()
  engineer_service_area_id?: string;

  @ApiPropertyOptional({ description: 'Filter by engineer_service_area_id' })
  @IsOptional()
  projects_id?: string;
}
