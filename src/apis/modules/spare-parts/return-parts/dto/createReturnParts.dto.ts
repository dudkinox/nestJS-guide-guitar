import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';
import { SpareParts } from 'src/model/SparePartsModel';
import { PickUpStatus } from '../../pick-up-parts/dto/pickUpParts.dto';

export class CreateReturnPartsDto {
  @ApiProperty({
    description: 'date',
    example: 'mongoId of projects',
  })
  @IsNotEmpty()
  @IsDateString()
  date: string;

  @ApiProperty({
    description: 'projects_id',
    example: '',
  })
  @IsNotEmpty()
  @IsMongoId()
  engineer_pick_up_parts_id: string;

  @ApiProperty({
    description: 'spare_parts',
    example: [],
  })
  @IsOptional()
  spare_parts: SpareParts[];

  @ApiProperty({
    description: 'requester_id',
    example: 'mongoId of requester',
  })
  @IsNotEmpty()
  @IsMongoId()
  requester_id: string;

  @ApiProperty({
    description: 'inspector_id',
    example: 'mongoId of requester',
  })
  @IsNotEmpty()
  @IsMongoId()
  inspector_id: string;

  @ApiProperty({
    description: 'status',
    example: 'Waiting',
  })
  @IsEnum(PickUpStatus)
  @IsNotEmpty()
  status: PickUpStatus;

  @ApiProperty({
    description: 'note',
    example: 'note',
  })
  @IsOptional()
  note: string;

  @ApiProperty({
    description: 'not_approve_reason',
    example: 'not_approve_reason',
  })
  not_approve_reason: string;
}
