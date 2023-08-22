import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsMongoId, IsOptional } from "class-validator";

enum AnswerType {
  "Image" = "Image",
  "File" = "File",
  "PassNotPassNA" = "PassNotPassNA",
}


export class CreateAnswerDto {

  @ApiProperty({ description: "engineer_worksheet_template_id", example: "" })
  @IsMongoId()
  engineer_worksheet_template_id: string

  @ApiProperty({ description: "questions_id", example: "" })
  @IsMongoId()
  questions_id: string

  @ApiProperty({ description: "choices_id", example: "" })
  @IsOptional()
  @IsMongoId()
  choices_id: string

  @ApiProperty({ description: "answer_type", example: "" })
  @IsOptional()
  @IsEnum(AnswerType)
  answer_type: string

  @ApiProperty({ description: "answer", example: "" })
  @IsOptional()
  answer: string
}