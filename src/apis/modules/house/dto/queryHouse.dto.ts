import { IsOptional } from 'class-validator';

export class QueryHouse {
  @IsOptional()
  projects_id: string;
  @IsOptional()
  engineer_service_area_id: string;
  @IsOptional()
  engineer_place_id: string;
}
