import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsMongoId,
  IsOptional,
} from 'class-validator';
import { WorkStatus } from './queryRepair.dto';
import { RepairDto } from './Repair.dto';

export enum RepairType {
  Machinery = 'Machinery',
  General = 'General',
}

export class UpdateRepairDto extends PartialType(RepairDto) {
  @ApiProperty({
    description: 'projects_id',
    example: 'mongoId of projects',
  })
  @IsOptional()
  @IsMongoId()
  projects_id: string;

  @ApiProperty({
    description: 'code',
    example: 'code',
  })
  @IsOptional()
  code: string;

  @ApiProperty({
    description: 'image',
    example: 'https://image.com/image.jpg',
  })
  image: string;

  @ApiProperty({
    description: 'title_th',
    example: 'ชื่อไทย',
  })
  @IsOptional()
  title_th: string;

  @ApiProperty({
    description: 'title_en',
    example: 'English name',
  })
  title_en: string;

  @ApiProperty({
    description: 'type',
    example: 'Machinery',
  })
  @IsOptional()
  @IsEnum(RepairType)
  type: RepairType;

  @ApiProperty({
    description: 'cancle_reason',
    example: 'reason',
  })
  @IsOptional()
  cancle_reason: string;

  @ApiProperty({
    description: 'machinery_id',
    example: 123456,
  })
  @IsOptional()
  @IsMongoId()
  machinery_id: string;

  @ApiProperty({
    description: 'repair_topic_th',
    example: 'ชื่อไทย',
  })
  repair_topic_th: string;

  @ApiProperty({
    description: 'repair_topic_en',
    example: 'English name',
  })
  repair_topic_en: string;

  @ApiProperty({
    description: 'detail_th',
    example: 'ชื่อไทย',
  })
  @IsOptional()
  detail_th: string;

  @ApiProperty({
    description: 'detail_en',
    example: 'English name',
  })
  detail_en: string;

  @ApiProperty({
    description: 'engineer_service_area_id',
    example: 123456,
  })
  @IsOptional()
  @IsMongoId()
  engineer_service_area_id: string;

  @ApiProperty({
    description: 'engineer_place_id',
    example: 1234,
  })
  @IsOptional()
  @IsMongoId()
  engineer_place_id: string;

  @ApiProperty({
    description: 'engineer_system_id',
    example: 1234,
  })
  @IsOptional()
  @IsMongoId()
  engineer_system_id: string;

  @ApiProperty({
    description: 'engineer_worksheet_template_id',
    example: 1234,
  })
  @IsOptional()
  @IsMongoId()
  engineer_worksheet_template_id: string;

  @ApiProperty({
    description: 'engineer_checker_team_id',
    example: 1234,
  })
  @IsOptional()
  @IsMongoId()
  engineer_checker_team_id: string;

  @ApiProperty({
    description: 'worker_id',
    example: 'worker_id',
  })
  @IsOptional()
  @IsMongoId()
  worker_id: string;

  @ApiProperty({
    description: 'answer',
    example: [],
  })
  @IsOptional()
  @IsMongoId({ each: true })
  answer: string[];

  @ApiProperty({
    description: 'has_pick_up_parts',
    example: false,
  })
  @IsOptional()
  has_pick_up_parts: boolean;

  @ApiProperty({
    description: 'note',
    example: '-',
  })
  note: string;

  @ApiProperty({ description: 'status', example: '' })
  @IsOptional()
  @IsEnum(WorkStatus)
  status: WorkStatus;

  @ApiProperty({
    description: 'start_at',
    example: '',
  })
  @IsOptional()
  @IsDateString()
  start_at: string;

  @ApiProperty({
    description: 'end_at',
    example: '',
  })
  @IsOptional()
  @IsDateString()
  end_at: string;

  @ApiProperty({
    description: 'start_by',
    example: '',
  })
  @IsOptional()
  @IsMongoId()
  start_by: string;

  @ApiProperty({
    description: 'end_by',
    example: '',
  })
  @IsOptional()
  @IsMongoId()
  end_by: string;

  @ApiProperty({
    description: 'is_active',
    example: '',
  })
  @IsOptional()
  @IsBoolean()
  is_active: boolean;
}
