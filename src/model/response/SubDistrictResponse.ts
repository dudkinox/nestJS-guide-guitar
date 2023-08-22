import { ApiProperty } from "@nestjs/swagger";

export class SubDistrictResponse {
  @ApiProperty()
  sdt_id: number;
  @ApiProperty()
  code: number;
  @ApiProperty()
  sdt_name_th: string;
  @ApiProperty()
  sdt_name_en: string;
  @ApiProperty()
  latitude: number;
  @ApiProperty()
  longitude: number;
  @ApiProperty()
  dt_id: number;
  @ApiProperty()
  zipcode: number;
}
