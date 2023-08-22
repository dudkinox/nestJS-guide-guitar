import { PartialType } from '@nestjs/mapped-types';
import { CreateMachineryDto } from './createMachinery.dto';
import { IsBoolean, IsMongoId, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateMachineryDto extends PartialType(CreateMachineryDto) {
  @ApiProperty({ description: 'projects_id', example: '' })
  @IsOptional()
  @IsMongoId()
  projects_id: string;

  @ApiProperty({ description: 'title_th', example: '' })
  @IsOptional()
  title_th: string;

  @ApiProperty({ description: 'engineer_system_id', example: '' })
  @IsOptional()
  @IsMongoId()
  engineer_system_id: string;

  @ApiProperty({ description: 'engineer_service_area_id', example: '' })
  @IsOptional()
  @IsMongoId()
  engineer_service_area_id: string;

  @ApiProperty({ description: 'engineer_place_id', example: '' })
  @IsOptional()
  @IsMongoId()
  engineer_place_id: string;

  @ApiProperty({ description: 'qr_code', example: '' })
  @IsOptional()
  qr_code: string;

  @ApiProperty({ description: 'is_active', example: '' })
  @IsOptional()
  @IsBoolean()
  is_active: boolean;
}
