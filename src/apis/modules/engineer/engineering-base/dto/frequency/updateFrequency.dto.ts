import { CreateFrequencyDto } from './createFrequency.dto';
import { IsBoolean, IsMongoId, IsOptional } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class UpdateFrequencyDto extends PartialType(CreateFrequencyDto) {
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
