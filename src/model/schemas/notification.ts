import mongoose, { Schema } from 'mongoose';

export const NotificationSchema = new mongoose.Schema(
  {
    projects_id: {
      data: {
        type: Schema.Types.ObjectId,
        ref: 'projects',
        required: true,
      },
      _id: String,
    },
    title_th: {
      type: String,
      required: true,
    },
    title_en: { type: String },
    description_th: { type: String, required: true },
    description_en: { type: String },
    link: { type: String },
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

export class NotificationModel {
  projects_id: string;
  title_th: string;
  title_en: string;
  description_th: string;
  description_en: string;
  link: string;
  is_active: boolean;
  created_by: string;
  updated_by: string;
}
