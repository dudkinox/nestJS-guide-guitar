import { PartialType } from "@nestjs/mapped-types"
import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsMongoId, IsOptional } from "class-validator";
import { CreateNotificationDto } from "./createNotification.dto";

export class UpdateNotificationDto extends PartialType(CreateNotificationDto) {
  @ApiProperty({ description: 'projects_id', example: '' })
  @IsOptional()
  @IsMongoId()
  projects_id: string;

  @ApiProperty({ description: 'description_th', example: "" })
  @IsOptional()
  description_th: string;

  @ApiProperty({ description: 'is_active', example: '' })
  @IsOptional()
  @IsBoolean()
  is_active: boolean;
}