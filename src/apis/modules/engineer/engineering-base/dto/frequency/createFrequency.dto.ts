import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsInt,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';

enum frequency_type {
  'Day' = 'Day',
  'Month' = 'Month',
  'Year' = 'Year',
}

export class CreateFrequencyDto {
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
    description: 'quantity',
    example: '2',
  })
  @IsOptional()
  @IsInt()
  quantity: number;

  @ApiProperty({
    description: 'frequency_type',
    example: 'Day,Month,Year',
  })
  @IsOptional()
  @IsEnum(frequency_type)
  frequency_type: string;
}
