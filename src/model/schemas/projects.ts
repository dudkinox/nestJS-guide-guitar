import { ApiProperty } from '@nestjs/swagger';
import mongoose, { Schema } from 'mongoose';

export const ProjectsSchema = new mongoose.Schema(
  {
    code: { type: String, required: true },
    type: {
      type: String,
      enum: [
        'Condominium',
        'Apartment',
        'HousingEstate',
        'RentalArea',
        'EuaArthornHouse',
      ],
      required: true,
    },
    name_th: { type: String, required: true },
    name_en: { type: String },
    initial_name: { type: String },
    initial_code: { type: String },
    phone: { type: String },
    fax: { type: String },
    tax_number: { type: String, required: true, unique: true },
    address_info_th: { type: String },
    address_info_en: { type: String },
    subdistrict_id: {
      data: {
        type: Schema.Types.ObjectId,
        ref: 'subdistricts',
        required: true,
      },
      _id: { type: String, required: true },
    },
    district_id: {
      data: {
        type: Schema.Types.ObjectId,
        ref: 'districts',
        required: true,
      },
      _id: { type: String, required: true },
    },
    province_id: {
      data: {
        type: Schema.Types.ObjectId,
        ref: 'provinces',
        required: true,
      },
      _id: { type: String, required: true },
    },
    contact_person_th: { type: String },
    contact_person_en: { type: String },
    contact_phone: { type: String },
    contact_email: { type: String },
    contact_address_th: { type: String },
    contact_address_en: { type: String },
    contact_subdistrict_id: {
      data: {
        type: Schema.Types.ObjectId,
        ref: 'subdistricts',
      },
      _id: { type: String },
    },
    contact_district_id: {
      data: { type: Schema.Types.ObjectId, ref: 'districts' },
      _id: { type: String },
    },
    contact_province_id: {
      data: { type: Schema.Types.ObjectId, ref: 'provinces' },
      _id: { type: String },
    },
    building_manager: {
      data: { type: Schema.Types.ObjectId, ref: 'user_employees' },
      _id: { type: String },
    },
    niti_manager: {
      data: { type: Schema.Types.ObjectId, ref: 'user_employees' },
      _id: { type: String },
    },
    accounting_manager: {
      data: { type: Schema.Types.ObjectId, ref: 'user_employees' },
      _id: { type: String },
    },
    finance_manager: {
      data: { type: Schema.Types.ObjectId, ref: 'user_employees' },
      _id: { type: String },
    },
    legal_regis_number: { type: String },
    registration_date: { type: Date },
    ownership_ratio: { type: Number },
    area: { type: Number },
    number_of_suites: { type: Number },
    number_of_stores: { type: Number },
    number_of_parking: { type: Number },
    first_collecting_fund: { type: Number },
    capital_balance: { type: Number },
    financial_start_date: { type: Date },
    financial_end_date: { type: Date },
    budget_start_date: { type: Date },
    budget_end_date: { type: Date },
    is_active: { type: Boolean, required: true, default: true },
    created_by: {
      data: {
        type: Schema.Types.ObjectId,
        ref: 'user_employees',
        required: true,
      },
      _id: { type: String },
    },
    updated_by: {
      data: {
        type: Schema.Types.ObjectId,
        ref: 'user_employees',
        required: true,
      },
      _id: { type: String },
    },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

export class Projects {
  @ApiProperty()
  code: string;
  @ApiProperty()
  type: string;
  @ApiProperty()
  name_th: string;
  @ApiProperty()
  name_en: string;
  @ApiProperty()
  initial_name: string;
  @ApiProperty()
  initial_code: string;
  @ApiProperty()
  phone: string;
  @ApiProperty()
  fax: string;
  @ApiProperty()
  tax_number: string;
  @ApiProperty()
  address_info_th: string;
  @ApiProperty()
  address_info_en: string;
  @ApiProperty()
  subdistrict_id: string;
  @ApiProperty()
  district_id: string;
  @ApiProperty()
  province_id: string;
  @ApiProperty()
  contact_person_th: string;
  @ApiProperty()
  contact_person_en: string;
  @ApiProperty()
  contact_phone: string;
  @ApiProperty()
  contact_email: string;
  @ApiProperty()
  contact_address_th: string;
  @ApiProperty()
  contact_address_en: string;
  @ApiProperty()
  contact_subdistrict_id: string;
  @ApiProperty()
  contact_district_id: string;
  @ApiProperty()
  contact_province_id: string;
  @ApiProperty()
  building_manager: string;
  @ApiProperty()
  niti_manager: string;
  @ApiProperty()
  accounting_manager: string;
  @ApiProperty()
  finance_manager: string;
  @ApiProperty()
  legal_regis_number: string;
  @ApiProperty()
  registration_date: Date;
  @ApiProperty()
  ownership_ratio: number;
  @ApiProperty()
  area: number;
  @ApiProperty()
  number_of_suites: number;
  @ApiProperty()
  number_of_stores: number;
  @ApiProperty()
  number_of_parking: number;
  @ApiProperty()
  first_collecting_fund: number;
  @ApiProperty()
  capital_balance: number;
  @ApiProperty()
  financial_start_date: Date;
  @ApiProperty()
  financial_end_date: Date;
  @ApiProperty()
  budget_start_date: Date;
  @ApiProperty()
  budget_end_date: Date;
  @ApiProperty()
  is_active: boolean;
  @ApiProperty()
  created_by: string;
  @ApiProperty()
  updated_by: string;
}
