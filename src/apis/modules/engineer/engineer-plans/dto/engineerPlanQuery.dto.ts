import { IsOptional } from 'class-validator';

export class PlansQuery {
  @IsOptional()
  machinery_id?: string
  @IsOptional()
  projects_id?: string;
  @IsOptional()
  engineer_work_type_id?: string;
  @IsOptional()
  engineer_frequency_id?: string;
  @IsOptional()
  worker_id?: string;
  @IsOptional()
  created_by?: string;
}
