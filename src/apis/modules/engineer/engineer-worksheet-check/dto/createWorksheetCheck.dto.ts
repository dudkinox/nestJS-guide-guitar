import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsMongoId, IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export enum Result {
  "Pass" = "Pass",
  "NotPass" = "NotPass"
}

export class CreateWorksheetCheckDto {
  @ApiProperty({ description: "answer_id", example: "" })
  @IsNotEmpty()
  @IsMongoId()
  answer_id: string;

  @ApiProperty({ description: "checker_id", example: "" })
  @IsNotEmpty()
  @IsMongoId()
  checker_id: string;

  @ApiProperty({ description: "checker_index", example: "" })
  @IsOptional()
  @IsNumber()
  checker_index: number;

  @ApiProperty({ description: "result", example: "" })
  @IsOptional()
  @IsEnum(Result)
  result: Result;

}