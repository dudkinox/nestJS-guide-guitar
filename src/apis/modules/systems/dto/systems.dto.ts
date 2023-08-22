import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { PermissionsDto } from "../../permissions/dto/permissions.dto";

export class SystemsDto {
  @ApiProperty({ description: "systems_id", example: "[mongo_id of system]" })
  @IsNotEmpty()
  id: number;

  @ApiProperty({ description: "title_th", example: "ทดสอบ" })
  @IsNotEmpty()
  title_th: string;

  @ApiProperty({ description: "title_en", example: "test" })
  title_en: string;

  @ApiProperty({ description: "is_active", example: "true" })
  @IsNotEmpty()
  is_active: boolean;

  @ApiProperty({
    description: "created_by",
    example: "mongoId of created_by",
  })
  @IsNotEmpty()
  created_by: string;

  @ApiProperty({
    description: "updated_by",
    example: "mongoId of updated_by",
  })
  @IsNotEmpty()
  updated_by: string;
}
