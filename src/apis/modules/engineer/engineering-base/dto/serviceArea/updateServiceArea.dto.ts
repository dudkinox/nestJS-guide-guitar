import { PartialType } from '@nestjs/mapped-types';
import { CreateServiceAreaDto } from './createServiceArea.dto';
import { IsBoolean, IsMongoId, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateServiceAreaDto extends PartialType(CreateServiceAreaDto) {
  @ApiProperty({
    description: 'projects_id',
    example: 'mongoId of projects',
  })
  @IsOptional()
  @IsMongoId()
  projects_id: string;

  @ApiProperty({
    description: 'title_th',
    example: 'ภาษาไทย',
  })
  @IsOptional()
  title_th: string;

  @ApiProperty({
    description: 'is_active',
    example: 'false',
  })
  @IsOptional()
  @IsBoolean()
  is_active: boolean;
}
