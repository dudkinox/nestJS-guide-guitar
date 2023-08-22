import { ApiProperty } from "@nestjs/swagger";
import { IsMongoId, IsNotEmpty } from "class-validator";
import { SystemsDto } from "../../systems/dto/systems.dto";

export class RolesDto {
  @ApiProperty({ description: "projects_id", example: "[mongo_id of project]" })
  @IsNotEmpty()
  @IsMongoId({ each: true })
  projects_id: string;

  @ApiProperty({ description: "title_th", example: "ทดสอบ" })
  @IsNotEmpty()
  title_th: string;

  @ApiProperty({ description: "title_en", example: "test" })
  title_en: string;

  @ApiProperty({ description: "description_th", example: "ทดสอบ" })
  description_th: string;

  @ApiProperty({ description: "description_en", example: "test" })
  description_en: string;

  @ApiProperty({
    description: "systems",
    example:
      "[{systems_id: 1, permissions: [{permissions_id: 1, is_active: true}], is_active: true}]",
  })
  systems: SystemsDto[];

  @ApiProperty({
    description: "is_active",
    example: "true",
  })
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
