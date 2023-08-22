import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { SpareParts } from 'src/model/SparePartsModel';

export enum PickUpStatus {
  Waiting = 'Waiting',
  Approve = 'Approve',
  NotApprove = 'NotApprove',
}

export enum PickUpType {
  ForPrivate = 'ForPrivate',
  ForRepair = 'ForRepair',
}

export class SparePartsPickUpDto {
  @IsMongoId()
  spare_parts_id: string;
  @IsNumber()
  quantity: number;
}

export class PickUpPartsDto {
  @ApiProperty({
    description: 'projects_id',
    example: '',
  })
  @IsNotEmpty()
  @IsMongoId()
  projects_id: string;

  @ApiProperty({
    description: 'date',
    example: 'mongoId of projects',
  })
  @IsNotEmpty()
  date: Date;

  @ApiProperty({
    description: 'title_th',
    example: 'ภาษาไทย',
  })
  @IsOptional()
  title_th: string;

  @ApiProperty({
    description: 'title_en',
    example: 'ภาษาอังกฤษ',
  })
  @IsOptional()
  title_en: string;

  @ApiProperty({
    description: 'is_repair',
    example: 'true',
  })
  @IsNotEmpty()
  is_repair: boolean;

  @ApiProperty({
    description: 'engineer_repair_id',
    example: 'mongoId of engineer_repair',
  })
  @IsOptional()
  @IsMongoId()
  engineer_repair_id: string;

  @ApiProperty({
    description: 'type',
    example: 'ForPrivate',
  })
  @IsEnum(PickUpType)
  @IsNotEmpty()
  type: PickUpType;

  @ApiProperty({
    description: 'spare_parts',
    example: [{ spare_parts_id: 'mongo', quantity: 10 }],
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SparePartsPickUpDto)
  spare_parts: SparePartsPickUpDto[];

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

  @ApiProperty({
    description: 'is_active',
    example: 'true',
  })
  @IsNotEmpty()
  is_active: boolean;

  @ApiProperty({
    description: 'created_by',
    example: 'mongoId of created_by',
  })
  @IsNotEmpty()
  created_by: string;

  @ApiProperty({
    description: 'updated_by',
    example: 'mongoId of updated_by',
  })
  @IsNotEmpty()
  updated_by: string;
}
