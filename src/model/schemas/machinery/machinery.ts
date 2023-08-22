import mongoose, { Schema } from 'mongoose';

export const MachinerySchema = new mongoose.Schema(
  {
    projects_id: {
      data: {
        type: Schema.Types.ObjectId,
        ref: 'projects',
        required: true,
      },
      _id: { type: String, required: true },
    },
    code: { type: String },
    title_th: { type: String, required: true },
    title_en: { type: String },
    image: { type: String },
    engineer_system_id: {
      data: {
        type: Schema.Types.ObjectId,
        ref: 'systems',
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
    brand: { type: String },
    model: { type: String },
    size: { type: String },
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

export class Machinery {
  projects_id: string;
  code: string;
  title_th: string;
  title_en: string;
  image: string;
  engineer_system_id: string;
  engineer_place_id: string;
  brand: string;
  model: string;
  size: string;
  is_active: boolean;
  created_by: string;
  created_at: string;
  updated_by: string;
  updated_at: string;
}
