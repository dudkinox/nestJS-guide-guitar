import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsUrl,
} from 'class-validator';

export class CreateSparePartDto {
  @ApiProperty({ description: 'projects_id', example: '' })
  @IsNotEmpty()
  @IsMongoId()
  projects_id: string;

  @ApiProperty({ description: 'code', example: 'รหัส' })
  @IsNotEmpty()
  code: string;

  @ApiProperty({ description: 'title_th', example: 'ชิ้นส่วน' })
  @IsNotEmpty()
  title_th: string;

  @ApiProperty({ description: 'title_en', example: 'parts' })
  title_en: string;

  @ApiProperty({ description: 'image', example: 'www.google.com/images' })
  @IsOptional()
  @IsUrl()
  image: string;

  @ApiProperty({ description: 'quantity', example: '2' })
  @IsOptional()
  @IsInt()
  quantity: number;

  @ApiProperty({ description: 'engineer_unit_id', example: 'mongo_id of unit' })
  @IsNotEmpty()
  @IsMongoId()
  engineer_unit_id: string;

  @ApiProperty({ description: 'model', example: 'Pipe' })
  model: string;

  @ApiProperty({ description: 'brand', example: 'วาว' })
  brand: string;

  @ApiProperty({ description: 'supplier', example: 'External' })
  supplier: string;
}
