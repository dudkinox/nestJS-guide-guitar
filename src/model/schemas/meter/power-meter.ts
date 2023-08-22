import { ApiProperty } from '@nestjs/swagger';
import mongoose, { Schema } from 'mongoose';

export const PowerMeterSchema = new mongoose.Schema(
  {
    projects_id: {
      data: {
        type: Schema.Types.ObjectId,
        ref: 'projects',
        required: true,
      },
      _id: { type: String, required: true },
    },
    record_date: {
      type: Date,
      required: true,
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
    house_id: {
      data: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'houses',
      },
      _id: { type: String, required: true },
    },
    power_meter_unit: Number,
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

export class PowerMeter {
  @ApiProperty()
  projects_id: string;
  @ApiProperty()
  record_date: Date;
  @ApiProperty()
  engineer_service_area_id: string;
  @ApiProperty()
  engineer_place_id: string;
  @ApiProperty()
  house_id: string;
  @ApiProperty()
  power_meter_unit: number;
  @ApiProperty()
  is_active: boolean;
  @ApiProperty()
  created_by: string;
  @ApiProperty()
  updated_by: string;
}
