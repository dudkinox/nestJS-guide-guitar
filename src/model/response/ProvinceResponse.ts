import { ApiProperty } from "@nestjs/swagger";

export class ProvinceResponse {
  @ApiProperty()
  pv_id: number;
  @ApiProperty()
  pv_name_th: string;
  @ApiProperty()
  pv_name_en: string;
}
