import mongoose, { Schema } from 'mongoose';

export const WaterMeterSchema = new mongoose.Schema(
  {
    projects_id: {
      data: {
        type: Schema.Types.ObjectId,
        ref: 'projects',
        required: true,
      },
      _id: String,
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
    water_meter_unit: {
      type: Number,
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

export class WaterMeter {
  projects_id: string;
  record_date: Date;
  engineer_service_area_id: string;
  engineer_place_id: string;
  house_id: string;
  power_meter_unit: number;
  is_active: boolean;
  created_by: string;
  updated_by: string;
}
