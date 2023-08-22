import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  ValidateNested,
} from "class-validator";

enum QuestionType {
  "SingleInput" = "SingleInput",
  "CheckBox" = "CheckBox",
  "RadioGroup" = "RadioGroup",
  "DropDown" = "DropDown",
  "Image" = "Image",
  "PassNotPass" = "PassNotPass",
  "File" = "File",
}

export class HeaderDto {
  @ApiProperty({
    description: "header_title",
    example: "แบบฟอร์มตรวจสอบเครื่องจักร",
  })
  @IsNotEmpty()
  header_title: string;

  @ApiProperty({
    description: "header_description",
    example:
      "“ประวัติการทำงานเครื่องจักร” เป็นส่วนที่บ่งบอกรายละเอียดเกี่ยวกับการใช้งานเครื่องจักรนั้นๆ เช่น วันที่นำเครื่องจักรไปติดตั้ง, วันที่ทำการตรวจเช็คและปัญหาที่พบ ,วันที่ทำการซ่อมบำรุง, ไปจนถึงวันที่ทำการยกเลิกการใช้งานเครื่องจักรตัวนั้น เพื่อนำไปส่งซ่อม,จำหน่าย",
  })
  header_description: string;

  @ApiProperty({
    description: "header_image",
    example:
      "https://image.makewebeasy.net/makeweb/m_1920x0/aET3f5n2w/DefaultData/12_1.jpg",
  })
  header_image: string;

  @ApiProperty({ description: "header_file", example: "" })
  header_file: string;
}

export class QuestionDto {

  @ApiProperty({
    description: "title",
    example: "คุณภาพเครื่องจักรที่ตรวจสอบ",
  })
  @IsNotEmpty()
  title: string;
  @ApiProperty({
    description: "type",
    example: "SingleInput",
  })
  @IsNotEmpty()
  type: QuestionType;
  @ApiProperty({
    description: "choices",
    example: [
      {
        title: "5 = ดีมาก",
      },
      {
        title: "4 = ดี",
      },
      {
        title: "3 = ปานกลาง",
      },
      {
        title: "2 = พอใช้",
      },
      {
        title: "1 = ปรับปรุง",
      },
    ],
  })
  choices: ChoicesDto[];
  @ApiProperty({
    description: "is_required",
    example: true,
  })
  is_required: boolean;
}

export class DetailsDto {
  @ApiProperty({
    description: "topic",
    example: "คำถามตรวจสอบคุณภาพเครื่องจักร",
  })
  topic: string;
  @ApiProperty({
    description: "detail_type",
    example: "Text",
  })
  detail_type: string;
  @ApiProperty({
    description: "detail",
    example: "5 = ดีมาก, 4 = ดี, 3 = ปานกลาง, 2 = พอใช้, 1 = ปรับปรุง",
  })
  detail: string;
}

export class ChoicesDto {
  @ApiProperty({ description: "title", example: "test" })
  title: string;
}

export class CreateWorksheetTemplateDto {
  @ApiProperty({ description: "projects_id", example: "uuid" })
  @IsMongoId()
  projects_id: string;

  @ApiProperty({
    description: "header",
    example: {
      header_title: "แบบฟอร์มตรวจสอบเครื่องจักร",
      header_description:
        "“ประวัติการทำงานเครื่องจักร” เป็นส่วนที่บ่งบอกรายละเอียดเกี่ยวกับการใช้งานเครื่องจักรนั้นๆ เช่น วันที่นำเครื่องจักรไปติดตั้ง, วันที่ทำการตรวจเช็คและปัญหาที่พบ ,วันที่ทำการซ่อมบำรุง, ไปจนถึงวันที่ทำการยกเลิกการใช้งานเครื่องจักรตัวนั้น เพื่อนำไปส่งซ่อม,จำหน่าย",
      header_image:
        "https://image.makewebeasy.net/makeweb/m_1920x0/aET3f5n2w/DefaultData/12_1.jpg",
      header_file: "",
    },
  })
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => HeaderDto)
  header: HeaderDto;

  @ApiProperty({
    description: "details",
    example: [
      {
        topic: "คำถามตรวจสอบคุณภาพเครื่องจักร",
        detail_type: "Text",
        detail: "5 = ดีมาก, 4 = ดี, 3 = ปานกลาง, 2 = พอใช้, 1 = ปรับปรุง",
      },
    ],
  })
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsDto)
  details: DetailsDto[];

  @ApiProperty({
    description: "questions",
    example: [
      {
        title: "คุณภาพเครื่องจักรที่ตรวจสอบ",
        type: "SingleInput",
        choices: [
          {
            title: "ระดับ 5",
          },
          {
            title: "ระดับ 4",
          },
        ],
        is_required: true,
      },
    ],
  })
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => QuestionDto)
  questions: QuestionDto[];
}
