import { IsOptional } from 'class-validator';

export class QueryWaterMeter {
  @IsOptional()
  projects_id: string;
  @IsOptional()
  house_id: string;
}
