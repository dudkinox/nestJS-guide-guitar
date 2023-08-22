import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';

export enum WorkStatus {
  'Waiting' = 'Waiting',
  'Processing' = 'Processing',
  'NotDone' = 'NotDone',
  'Checking' = 'Checking',
  'Successed' = 'Successed',
  'NotSucceed' = 'NotSucceed',
  'Canceled' = 'Canceled',
  'NewTask' = 'NewTask',
  'OnProcess' = 'OnProcess',
  'Complete' = 'Complete',
  'Incomplete' = 'Incomplete',
}

export class RepairQuery {
  @ApiPropertyOptional({ description: 'Filter by created_by' })
  @IsOptional()
  created_by?: string;
  @ApiPropertyOptional({ description: 'Filter by worker_id' })
  @IsOptional()
  worker_id?: string;
  @ApiPropertyOptional({ description: 'Filter by status', enum: WorkStatus })
  @IsOptional()
  @IsEnum(WorkStatus)
  status?: WorkStatus;
  @ApiPropertyOptional({ description: 'Filter by projects_id' })
  @IsOptional()
  projects_id: string;
}
