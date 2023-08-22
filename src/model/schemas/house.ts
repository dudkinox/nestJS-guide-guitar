import { ApiProperty } from '@nestjs/swagger';
import mongoose, { Schema } from 'mongoose';

export const HouseSchema = new mongoose.Schema(
  {
    projects_id: {
      data: {
        type: Schema.Types.ObjectId,
        ref: 'projects',
        required: true,
      },
      _id: { type: String, required: true },
    },
    engineer_service_area_id: {
      data: {
        type: Schema.Types.ObjectId,
        ref: 'service_areas',
        required: true,
      },
      _id: { type: String, required: true },
    },
    engineer_place_id: {
      data: {
        type: Schema.Types.ObjectId,
        ref: 'places',
        required: true,
      },
      _id: { type: String, required: true },
    },
    unit_number: String,
    house_number: { type: String, required: true },
    building: String,
    floor: String,
    type: {
      type: String,
      enum: [
        'RentFacility',
        'NotTransferredYet',
        'TransferredAndRentOut',
        'TransferredAndNotStayYet',
        'TransferredAndLiving',
      ],
      required: true,
    },
    room: String,
    contract_number: String,
    qr_payment: String,
    ownership_ratio: Number,
    area: Number,
    status: { type: Boolean, required: true, default: true },
    cooling: Number,
    residents: [
      {
        user_residents_id: {
          data: { type: Schema.Types.ObjectId },
          _id: String,
        },
        residents_role: { type: String, Enum: ['owner', 'rental', 'dweller'] },
      },
    ],
    transfer_date: Date,
    date_of_entry: Date,
    appointment_for_delivery: Date,
    delivery_date: Date,
    warranty_end_date: Date,
    type_of_residence: {
      type: String,
      Enum: ['LiveByMyself', 'RentOut', 'RentFacilityOnly'],
    },
    invoice_address_info_th: String,
    invoice_address_info_en: String,
    invoice_subdistrict_id: {
      data: {
        type: Schema.Types.ObjectId,
        ref: 'subdistricts',
        required: true,
      },
      _id: { type: String, required: true },
    },
    invoice_district_id: {
      data: {
        type: Schema.Types.ObjectId,
        ref: 'districts',
        required: true,
      },
      _id: { type: String, required: true },
    },
    invoice_province_id: {
      data: {
        type: Schema.Types.ObjectId,
        ref: 'provinces',
        required: true,
      },
      _id: { type: String, required: true },
    },
    is_active: { type: Boolean, required: true, default: true },
    created_by: {
      data: {
        type: Schema.Types.ObjectId,
        ref: 'user_employees',
        required: true,
      },
      _id: { type: String, required: true },
    },
    updated_by: {
      data: {
        type: Schema.Types.ObjectId,
        ref: 'user_employees',
        required: true,
      },
      _id: { type: String, required: true },
    },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

export class House {
  @ApiProperty()
  _id: string;
  @ApiProperty()
  engineer_service_area_id: {
    data: string;
    _id: string;
  };
  @ApiProperty()
  engineer_place_id: {
    data: string;
    _id: string;
  };
  @ApiProperty()
  unit_number: string;
  @ApiProperty()
  house_number: string;
  @ApiProperty()
  building: string;
  @ApiProperty()
  floor: string;
  @ApiProperty()
  type: string;
  @ApiProperty()
  room: string;
  @ApiProperty()
  qr_payment: string;
  @ApiProperty()
  ownership_ratio: number;
  @ApiProperty()
  area: number;
  @ApiProperty()
  status: boolean;
  @ApiProperty()
  cooling: string;
  @ApiProperty()
  residents: {
    user_residents_id: { data: string; _id: string };
    residents_role: string;
  };
  @ApiProperty()
  transfer_date: Date;
  @ApiProperty()
  date_of_entry: Date;
  @ApiProperty()
  appointment_for_delivery: Date;
  @ApiProperty()
  delivery_date: Date;
  @ApiProperty()
  warranty_end_date: Date;
  @ApiProperty()
  type_of_residence: string;
  @ApiProperty()
  invoice_address_info_th: string;
  @ApiProperty()
  invoice_address_info_en: string;
  @ApiProperty()
  invoice_subdistrict_id: {
    data: string;
    _id: string;
  };
  @ApiProperty()
  invoice_district_id: {
    data: string;
    _id: string;
  };
  @ApiProperty()
  invoice_province_id: {
    data: string;
    _id: string;
  };
  @ApiProperty()
  is_active: boolean;
  @ApiProperty()
  created_by: {
    data: string;
    _id: string;
  };
  @ApiProperty()
  updated_by: {
    data: string;
    _id: string;
  };
}
