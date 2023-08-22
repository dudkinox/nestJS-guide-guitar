import { IsOptional } from "class-validator";

export class QueryAnswerDto {

  @IsOptional()
  type: "repair" | "plan"

  @IsOptional()
  repair_id: string

  @IsOptional()
  plan_id: string
}