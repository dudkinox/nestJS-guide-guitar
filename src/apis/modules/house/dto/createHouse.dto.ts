import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  ValidateNested,
} from 'class-validator';

enum HouseType {
  'RentFacility' = 'RentFacility',
  'NotTransferredYet' = 'NotTransferredYet',
  'TransferredAndRentOut' = 'TransferredAndRentOut',
  'TransferredAndNotStayYet' = 'TransferredAndNotStayYet',
  'TransferredAndLiving' = 'TransferredAndLiving',
}

enum ResidenceType {
  'LiveByMyself' = 'LiveByMyself',
  'RentOut' = 'RentOut',
  'RentFacilityOnly' = 'RentFacilityOnly',
}

enum ResidenceRole {
  'owner' = 'owner',
  'rental' = 'rental',
  'dweller' = 'dweller',
}

export class ResidentsDto {
  @ApiProperty()
  @IsMongoId()
  user_residents_id: string;

  @ApiProperty()
  @IsEnum(ResidenceRole)
  residents_role: string;
}

export class CreateHouseDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  projects_id: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  engineer_service_area_id: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  engineer_place_id: string;

  @ApiProperty()
  unit_number: string;

  @ApiProperty()
  @IsNotEmpty()
  house_number: string;

  @ApiProperty()
  building: string;

  @ApiProperty()
  floor: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(HouseType)
  type: string;

  @ApiProperty()
  room: string;

  @ApiProperty()
  contract_number: string;

  @ApiProperty()
  qr_payment: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  ownership_ratio: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  area: number;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  status: boolean;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  cooling: number;

  @ApiProperty({
    description: 'residents',
    example: [
      {
        user_residents_id: 'mongo_id',
        residents_role: 'owner',
      },
    ],
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ResidentsDto)
  residents: ResidentsDto[];

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  transfer_date: string;

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  date_of_entry: string;

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  appointment_for_delivery: string;

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  delivery_date: string;

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  warranty_end_date: string;

  @ApiProperty()
  @IsOptional()
  @IsEnum(ResidenceType)
  type_of_residence: string;

  @ApiProperty()
  invoice_address_info_th: string;

  @ApiProperty()
  invoice_address_info_en: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  invoice_subdistrict_id: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  invoice_district_id: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  invoice_province_id: string;
}
