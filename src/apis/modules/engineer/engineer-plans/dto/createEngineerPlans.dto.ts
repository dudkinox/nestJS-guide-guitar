import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsDateString,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';

export class CreateEngineerPlanDto {
  @ApiProperty({ description: 'projects_id', example: '' })
  @IsMongoId()
  projects_id: string;

  @ApiProperty({ description: 'code', example: 'รหัส' })
  @IsNotEmpty()
  code: string;

  @ApiProperty({ description: 'title_th', example: 'ชิ้นส่วน' })
  @IsNotEmpty()
  title_th: string;

  @ApiProperty({ description: 'title_en', example: 'parts' })
  title_en: string;

  @ApiProperty({ description: 'operation_date', example: '02-12-2000' })
  @IsOptional()
  @IsDateString()
  operation_date: Date;

  @ApiProperty({ description: 'start_time', example: 'xx:xx' })
  start_time: string;

  @ApiProperty({ description: 'end_time', example: 'xx:xx' })
  end_time: string;

  @ApiProperty({
    description: 'engineer_system_id',
    example: 'mongo_id of engineer_system',
  })
  @IsOptional()
  @IsMongoId()
  engineer_system_id: string;

  @ApiProperty({
    description: "cancle_reason",
    example: "reason"
  })
  @IsOptional()
  cancle_reason: string;

  @ApiProperty({
    description: 'engineer_work_type_id',
    example: 'mongo_id of engineer_work_type',
  })
  @IsOptional()
  @IsMongoId()
  engineer_work_type_id: string;

  @ApiProperty({
    description: 'engineer_service_area_id',
    example: 'mongo_id of engineer_service_area',
  })
  @IsOptional()
  @IsMongoId()
  engineer_service_area_id: string;

  @ApiProperty({
    description: 'machinery_id',
    example: 'mongo_id of machinery',
  })
  @IsOptional()
  @IsMongoId()
  machinery_id: string;

  @ApiProperty({
    description: 'engineer_frequency_id',
    example: 'mongo_id of engineer_frequency',
  })
  @IsOptional()
  @IsMongoId()
  engineer_frequency_id: string;

  @ApiProperty({
    description: 'engineer_worksheet_template_id',
    example: 'mongo_id of engineer_worksheet_template',
  })
  @IsOptional()
  @IsMongoId()
  engineer_worksheet_template_id: string;

  @ApiProperty({
    description: 'owner_work',
    example: 'mongo_id of user_employee',
  })
  @IsOptional()
  @IsMongoId()
  owner_work: string;

  @ApiProperty({
    description: 'worker_id',
    example: 'mongo_id of user_employee',
  })
  @IsOptional()
  @IsMongoId()
  worker_id: string;

  @ApiProperty({
    description: 'answer',
    example: '[]',
  })
  @IsOptional()
  @IsMongoId({ each: true })
  answer: string[];

  @ApiProperty({ description: 'related_file', example: 'xxxxxxx' })
  related_files: string;

  @ApiProperty({ description: 'detail_th', example: 'เทส' })
  detail_th: string;

  @ApiProperty({ description: 'detail_en', example: 'Test' })
  detail_en: string;

  @ApiProperty({
    description: 'engineer_checker_team_id',
    example: 'mongo_id of engineer_checker_team',
  })
  @IsOptional()
  @IsMongoId()
  engineer_checker_team_id: string;

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
}
