import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsMongoId,
  IsOptional,
} from 'class-validator';
import { PickUpStatus } from '../../pick-up-parts/dto/pickUpParts.dto';

import { CreateReturnPartsDto } from './createReturnParts.dto';

export class UpdateReturnPartsDto extends PartialType(CreateReturnPartsDto) {
  @ApiProperty({
    description: 'date',
    example: 'mongoId of projects',
  })
  @IsOptional()
  @IsDateString()
  date: string;

  @ApiProperty({
    description: 'projects_id',
    example: '',
  })
  @IsOptional()
  @IsMongoId()
  engineer_pick_up_parts_id: string;

  @ApiProperty({
    description: 'requester_id',
    example: 'mongoId of requester',
  })
  @IsOptional()
  @IsMongoId()
  requester_id: string;

  @ApiProperty({
    description: 'inspector_id',
    example: 'mongoId of requester',
  })
  @IsOptional()
  @IsMongoId()
  inspector_id: string;

  @ApiProperty({
    description: 'status',
    example: 'Waiting',
  })
  @IsEnum(PickUpStatus)
  @IsOptional()
  status: PickUpStatus;

  @ApiProperty({
    description: 'not_approve_reason',
    example: 'not_approve_reason',
  })
  @IsOptional()
  not_approve_reason: string;

  @ApiProperty({
    description: 'is_active',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  is_active: boolean;
}
