import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class CreatePowerMeterDto {
  @ApiProperty({ description: 'projects_id', example: '' })
  @IsNotEmpty()
  @IsMongoId()
  projects_id: string;

  @ApiProperty({ description: 'record_date', example: '' })
  @IsNotEmpty()
  @IsDateString()
  record_date: Date;

  @ApiProperty({ description: 'engineer_service_area_id', example: '' })
  @IsNotEmpty()
  @IsMongoId()
  engineer_service_area_id: string;

  @ApiProperty({ description: 'engineer_place_id', example: '' })
  @IsNotEmpty()
  @IsMongoId()
  engineer_place_id: string;

  @ApiProperty({ description: 'house_id', example: '' })
  @IsNotEmpty()
  @IsMongoId()
  house_id: string;

  @ApiProperty({ description: 'power_meter_unit', example: '' })
  @IsOptional()
  @IsNumber()
  power_meter_unit: number;
}
