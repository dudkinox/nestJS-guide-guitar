import { PartialType } from "@nestjs/mapped-types";
import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsMongoId, IsOptional } from "class-validator";
import { CreateWorksheetCheckDto } from "./createWorksheetCheck.dto";

export class UpdateWorksheetCheckDto extends PartialType(CreateWorksheetCheckDto) {

  @ApiProperty({ description: "projects_id", example: "" })
  @IsOptional()
  @IsMongoId()
  projects_id: string;

  @ApiProperty({ description: "engineer_plans_id", example: "" })
  @IsOptional()
  @IsMongoId()
  engineer_plans_id: string;

  @ApiProperty({ description: "engineer_repair_id", example: "" })
  @IsOptional()
  @IsMongoId()
  engineer_repair_id: string;

  @ApiProperty({ description: "is_active", example: "" })
  @IsOptional()
  @IsBoolean()
  is_active: boolean;
}