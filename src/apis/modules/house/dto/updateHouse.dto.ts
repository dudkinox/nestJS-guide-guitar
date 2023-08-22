import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';
import { CreateHouseDto } from './createHouse.dto';

export class UpdateHouseDto extends PartialType(CreateHouseDto) {
  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  is_active: boolean;
}
