import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';

enum check_type {
  'Sequent' = 'Sequent',
  'NoSequent' = 'NoSequent',
}

export class CreateCheckerTeamDto {
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
    description: 'check_type',
    example: '["Sequent","NoSequent"]',
  })
  @IsEnum(check_type)
  check_type: string;

  @ApiProperty({
    description: 'first_checker',
    example: ['mongo_id'],
  })
  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  first_checker: string[];

  @ApiProperty({
    description: 'second_checker',
    example: ['mongo_id'],
  })
  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  second_checker: string[];

  @ApiProperty({
    description: 'third_checker',
    example: ['mongo_id'],
  })
  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  third_checker: string[];

  @ApiProperty({
    description: 'fourth_checker',
    example: ['mongo_id'],
  })
  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  fourth_checker: string[];

  @ApiProperty({
    description: 'fifth_checker',
    example: ['mongo_id'],
  })
  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  fifth_checker: string[];
}
