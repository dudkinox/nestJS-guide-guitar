import { CreatePowerMeterDto } from './createPowerMeter.dto';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsMongoId,
  IsOptional,
} from 'class-validator';

export class UpdatePowerMeterDto extends PartialType(CreatePowerMeterDto) {
  @ApiProperty({ description: 'projects_id', example: '' })
  @IsOptional()
  @IsMongoId()
  projects_id: string;

  @ApiProperty({ description: 'record_date', example: '' })
  @IsOptional()
  @IsDateString()
  record_date: Date;

  @ApiProperty({ description: 'engineer_service_area_id', example: '' })
  @IsOptional()
  @IsMongoId()
  engineer_service_area_id: string;

  @ApiProperty({ description: 'engineer_place_id', example: '' })
  @IsOptional()
  @IsMongoId()
  engineer_place_id: string;

  @ApiProperty({ description: 'house_id', example: '' })
  @IsOptional()
  @IsMongoId()
  house_id: string;

  @ApiProperty({ description: 'is_active', example: '' })
  @IsOptional()
  @IsBoolean()
  is_active: boolean;
}
