import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional } from "class-validator";

export class MachineryHistoryDto {
  @ApiProperty({
    description: "project_id",
    example: "0",
  })
  @IsNotEmpty()
  project_id: string;

  @ApiProperty({
    description: "machinery_id",
    example: "0",
  })
  @IsNotEmpty()
  machinery_id: string;

  @ApiProperty({
    description: "date",
    example: new Date(),
  })
  @IsNotEmpty()
  date: Date;

  @ApiProperty({
    description: "worker_id",
    example: 0,
  })
  @IsNotEmpty()
  worker_id: string;

  @ApiProperty({
    description: "order_number",
    example: "order_number",
  })
  @IsNotEmpty()
  order_number: string;

  @ApiProperty({
    description: "guarantee",
    example: "guarantee",
  })
  @IsNotEmpty()
  guarantee: string;

  @ApiProperty({
    description: "note",
    example: "note",
  })
  @IsOptional()
  note: string;

  @ApiProperty({
    description: "is_active",
    example: true,
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
