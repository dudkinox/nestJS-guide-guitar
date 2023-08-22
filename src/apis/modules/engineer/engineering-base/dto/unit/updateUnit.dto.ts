import { CreateUnitDto } from './createUnit.dto';
import { IsBoolean, IsOptional } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class UpdateUnitDto extends PartialType(CreateUnitDto) {
  @ApiProperty({
    description: 'projects_id',
    example: 'mongo_id',
  })
  @IsOptional()
  @IsBoolean()
  projects_id: string;
  @ApiProperty({
    description: 'is_active',
    example: 'true',
  })
  @IsOptional()
  @IsBoolean()
  is_active: boolean;

  @ApiProperty({
    description: 'title_th',
    example: 'ภาษาไทย',
  })
  @IsOptional()
  title_th: string;
}
