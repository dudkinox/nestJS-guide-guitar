import { ApiProperty } from "@nestjs/swagger";
import {
  IsDateString,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
} from "class-validator";
import { Type } from "src/model/enum/project.enum";

export class CreateProjectDto {
  @ApiProperty({
    description: "code",
    example: "รหัสอาคาร",
  })
  @IsNotEmpty()
  code: string;

  @ApiProperty({
    description: "type",
    example: "Condominium,Apartment,HousingEstate,RentalArea,EuaArthornHouse",
  })
  @IsEnum(Type)
  type: string;

  @ApiProperty({
    description: "name_th",
    example: "ชื่อภาษาไทย",
  })
  @IsNotEmpty()
  name_th: string;

  @ApiProperty({
    description: "name_en",
    example: "ชื่อภาษาอังกฤษ",
  })
  name_en: string;

  @ApiProperty({
    description: "initial_name",
    example: "ชื่อย่อ",
  })
  initial_name: string;

  @ApiProperty({
    description: "initial_code",
    example: "รหัสย่อ",
  })
  initial_code: string;

  @ApiProperty({
    description: "phone",
    example: "08x-xxx-xxxx",
  })
  @IsPhoneNumber("TH")
  phone: string;

  @ApiProperty({
    description: "fax",
    example: "0x-xxx-xxxx",
  })
  fax: string;

  @ApiProperty({
    description: "tax number",
    example: "0x-xxx-xxxx",
  })
  @IsNotEmpty()
  tax_number: string;

  @ApiProperty({
    description: "address info (TH)",
    example: "ที่อยู่ (ภาษาไทย)",
  })
  address_info_th: string;

  @ApiProperty({
    description: "address info (EN)",
    example: "ที่อยู่ (English)",
  })
  address_info_en: string;

  @ApiProperty({
    description: "subdistrict_id",
    example: "id ของ ตำบล",
  })
  @IsNotEmpty()
  @IsMongoId()
  subdistrict_id: string;

  @ApiProperty({
    description: "district_id",
    example: "id ของ เขต",
  })
  @IsNotEmpty()
  @IsMongoId()
  district_id: string;

  @ApiProperty({
    description: "province_id",
    example: "id ของ จังหวัด",
  })
  @IsNotEmpty()
  @IsMongoId()
  province_id: string;

  @ApiProperty({
    description: "contact_person_th",
    example: "ชื่อคนติดต่อ (ภาษาไทย)",
  })
  contact_person_th: string;

  @ApiProperty({
    description: "contact_person_en",
    example: "ชื่อคนติดต่อ (English)",
  })
  contact_person_en: string;

  @ApiProperty({
    description: "contact_phone",
    example: "08x-xxx-xxxx",
  })
  contact_phone: string;

  @ApiProperty({
    description: "contact_email",
    example: "อีเมลล์คนติดต่อ",
  })
  contact_email: string;

  @ApiProperty({
    description: "contact_address_th",
    example: "ที่อยู่คนติดต่อ (ภาษาไทย)",
  })
  contact_address_th: string;

  @ApiProperty({
    description: "contact_address_en",
    example: "ที่อยู่คนติดต่อ (English)",
  })
  contact_address_en: string;

  @ApiProperty({
    description: "contact_subdistrict_id",
    example: "id ของ ตำบล",
  })
  @IsOptional()
  @IsMongoId()
  contact_subdistrict_id: string;

  @ApiProperty({
    description: "contact_district_id",
    example: "id ของ เขต",
  })
  @IsOptional()
  @IsMongoId()
  contact_district_id: string;

  @ApiProperty({
    description: "contact_district_id",
    example: "id ของ จังหวัด",
  })
  @IsOptional()
  @IsMongoId()
  contact_province_id: string;

  @ApiProperty({
    description: "building_manager",
    example: "รหัส uuid user",
  })
  @IsOptional()
  @IsMongoId()
  building_manager: string;

  @ApiProperty({
    description: "niti_manager",
    example: "รหัส uuid user",
  })
  @IsOptional()
  @IsMongoId()
  niti_manager: string;

  @ApiProperty({
    description: "accounting_manager",
    example: "รหัส uuid user",
  })
  @IsOptional()
  @IsMongoId()
  accounting_manager: string;

  @ApiProperty({
    description: "finance_manager",
    example: "รหัส uuid user",
  })
  @IsOptional()
  @IsMongoId()
  finance_manager: string;

  @ApiProperty({
    description: "legal_regis_number",
    example: "",
  })
  legal_regis_number: string;

  @ApiProperty({
    description: "registration_date",
    example: "",
  })
  @IsDateString()
  registration_date: Date;

  @ApiProperty({
    description: "area",
    example: "",
  })
  area: number;

  @ApiProperty({
    description: "number_of_suites",
    example: "",
  })
  number_of_suites: number;

  @ApiProperty({
    description: "number_of_stores",
    example: "",
  })
  number_of_stores: number;

  @ApiProperty({
    description: "number_of_parking",
    example: "",
  })
  number_of_parking: number;

  @ApiProperty({
    description: "first_collecting_fund",
    example: "",
  })
  first_collecting_fund: number;

  @ApiProperty({
    description: "capital_balance",
    example: "",
  })
  capital_balance: number;

  @ApiProperty({
    description: "financial_start_date",
    example: "",
  })
  @IsOptional()
  @IsDateString()
  financial_start_date: Date;

  @ApiProperty({
    description: "financial_end_date",
    example: "",
  })
  @IsOptional()
  @IsDateString()
  financial_end_date: Date;

  @ApiProperty({
    description: "budget_start_date",
    example: "",
  })
  @IsOptional()
  @IsDateString()
  budget_start_date: Date;

  @ApiProperty({
    description: "budget_end_date",
    example: "",
  })
  @IsOptional()
  @IsDateString()
  budget_end_date: Date;
}
