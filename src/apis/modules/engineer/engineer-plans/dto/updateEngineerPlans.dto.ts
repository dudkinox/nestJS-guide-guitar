import { PartialType } from '@nestjs/mapped-types';
import { CreateEngineerPlanDto } from './createEngineerPlans.dto';
import { IsBoolean, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateEngineerPlanDto extends PartialType(CreateEngineerPlanDto) {
  @ApiProperty({ description: 'is_active', example: true })
  @IsOptional()
  @IsBoolean()
  is_active: boolean;
}
