import { ApiProperty } from '@nestjs/swagger';
import {
  IsMongoId,
  IsNotEmpty,
} from 'class-validator';

export class CreateNotificationDto {
  @ApiProperty({ description: 'projects_id', example: '' })
  @IsNotEmpty()
  @IsMongoId()
  projects_id: string;

  @ApiProperty({ description: 'title_th', example: "" })
  @IsNotEmpty()
  title_th: string;

  @ApiProperty({ description: 'title_en', example: "" })
  title_en: string;

  @ApiProperty({ description: 'description_th', example: "" })
  @IsNotEmpty()
  description_th: string;

  @ApiProperty({ description: 'description_en', example: "" })
  description_en: string;

  @ApiProperty({ description: 'link', example: "" })
  link: string;
}
