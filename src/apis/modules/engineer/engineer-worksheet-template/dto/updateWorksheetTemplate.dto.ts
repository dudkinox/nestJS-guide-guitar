import { PartialType } from "@nestjs/mapped-types";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  IsBoolean,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  ValidateNested,
} from "class-validator";
import {
  CreateWorksheetTemplateDto,
  DetailsDto,
  HeaderDto,
  QuestionDto,
} from "./createWorksheetTemplate.dto";

export class UpdatedHeader extends PartialType(HeaderDto) {
  @IsMongoId()
  id: string;

  @IsOptional()
  header_title?: string;
}

export class UpdatedQuestion extends PartialType(QuestionDto) {
  @IsMongoId()
  id: string;

  @IsOptional()
  title?: string;
}

export class UpdateWorksheetTemplateDto {
  @ApiProperty({ description: "projects_id", example: "uuid" })
  @IsMongoId()
  projects_id?: string;

  @ApiProperty({
    description: "header",
    example: {
      id: "uuid",
      header_title: "Header1",
      header_description: "1234",
      header_image: "",
      header_file: "",
    },
  })
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => UpdatedHeader)
  header: UpdatedHeader;

  @ApiProperty({
    description: "details",
    example: [
      {
        id: "649b0a4df21a70dffc93444d",
        topic: "คำถามตรวจสอบคุณภาพเครื่องจักร",
        detail_type: "Text",
        detail: "5 = ดีมาก, 4 = ดี, 3 = ปานกลาง, 2 = พอใช้, 1 = ปรับปรุง",
      },
    ],
  })
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => DetailsDto)
  details: DetailsDto[];

  @ApiProperty({
    description: "questions",
    example: [
      {
        title: "Question1",
        type: "SingleInput",
        choice: ["1234"],
        required: false,
      },
      {
        title: "Question2",
        type: "SingleInput",
        choice: ["1234"],
        required: false,
      },
    ],
  })
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => UpdatedQuestion)
  questions: UpdatedQuestion[];

  @ApiProperty({ description: "is_active", example: true })
  @IsOptional()
  is_active: boolean;
}
