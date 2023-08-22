import { ApiProperty } from "@nestjs/swagger";

export class DistrictResponse {
  @ApiProperty()
  dt_id: number;
  @ApiProperty()
  code: number;
  @ApiProperty()
  dt_name_th: string;
  @ApiProperty()
  dt_name_en: string;
  @ApiProperty()
  pv_id: number;
}
