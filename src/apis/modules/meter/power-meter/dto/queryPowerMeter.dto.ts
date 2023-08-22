import { IsOptional } from 'class-validator';

export class QueryPowerMeter {
  @IsOptional()
  projects_id: string;
  @IsOptional()
  house_id: string;
}
