import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';

export class CreatePlaceDto {
  @ApiProperty({
    description: 'projects_id',
    example: 'mongoId of projects',
  })
  @IsNotEmpty()
  @IsMongoId()
  projects_id: string;

  @ApiProperty({
    description: 'code',
    example: 'code',
  })
  code: string;

  @ApiProperty({
    description: 'title_th',
    example: 'ภาษาไทย',
  })
  @IsNotEmpty()
  title_th: string;

  @ApiProperty({
    description: 'title_en',
    example: 'ภาษาอังกฤษ',
  })
  title_en: string;

  @ApiProperty({
    description: 'engineer_service_area_id',
    example: 'mongoId of service area',
  })
  @IsOptional()
  @IsMongoId()
  engineer_service_area_id: string;
}
