import { PartialType } from '@nestjs/mapped-types';
import { CreateSparePartDto } from './createSparePart.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateSparePartDto extends PartialType(CreateSparePartDto) {
  @ApiProperty({ description: 'is_active', example: false })
  is_active: boolean;
}
