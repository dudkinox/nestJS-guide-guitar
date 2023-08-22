import { IsBoolean, IsOptional } from 'class-validator';
import { CreateProjectDto } from './createProject.dto';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class UpdateProjectDto extends PartialType(CreateProjectDto) {
  @ApiProperty({
    description: 'is_active',
    example: 'true',
  })
  @IsOptional()
  @IsBoolean()
  is_active: boolean;
}
