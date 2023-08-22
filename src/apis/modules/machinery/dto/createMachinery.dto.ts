import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty } from 'class-validator';

export class CreateMachineryDto {
  @ApiProperty({ description: 'projects_id', example: 'mongo id of project' })
  @IsNotEmpty()
  @IsMongoId()
  projects_id: string;

  @ApiProperty({ description: 'code', example: '1234' })
  code: string;

  @ApiProperty({ description: 'title_th', example: 'เครื่อง 1' })
  @IsNotEmpty()
  title_th: string;

  @ApiProperty({ description: 'title_en', example: 'Machine 1' })
  title_en: string;

  @ApiProperty({ description: 'image', example: 'image1.jpg' })
  image: string;

  @ApiProperty({ description: 'engineer_system_id', example: '' })
  @IsNotEmpty()
  @IsMongoId()
  engineer_system_id: string;

  @ApiProperty({ description: 'engineer_service_area_id', example: '' })
  @IsNotEmpty()
  @IsMongoId()
  engineer_service_area_id: string;

  @ApiProperty({ description: 'engineer_place_id', example: '' })
  @IsNotEmpty()
  @IsMongoId()
  engineer_place_id: string;

  @ApiProperty({ description: 'brand', example: '' })
  brand: string;

  @ApiProperty({ description: 'model', example: '' })
  model: string;

  @ApiProperty({ description: 'size', example: '' })
  size: string;
}
