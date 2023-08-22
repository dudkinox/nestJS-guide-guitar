import mongoose, { Schema } from 'mongoose';

export const EngineerFrequencyTypeSchema = new mongoose.Schema(
  {
    projects_id: {
      data: {
        type: Schema.Types.ObjectId,
        ref: 'projects',
        required: true,
      },
      _id: String,
    },
    code: { type: String },
    title_th: { type: String, required: true },
    title_en: { type: String },
    quantity: { type: Number },
    frequency_type: { type: String, enum: ['Day', 'Month', 'Year'] },
    is_active: { type: Boolean, required: true, default: true },
    created_by: {
      data: {
        type: Schema.Types.ObjectId,
        ref: 'user_employees',
        required: true,
      },
      _id: String,
    },
    updated_by: {
      data: {
        type: Schema.Types.ObjectId,
        ref: 'user_employees',
        required: true,
      },
      _id: String,
    },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

export class EngineerFrequency {
  projects_id: string;
  code: string;
  title_th: string;
  title_en: string;
  quantity: number;
  frequency_type: string;
  is_active: boolean;
  created_by: string;
  updated_by: string;
  created_at: Date;
  updated_at: Date;
}
