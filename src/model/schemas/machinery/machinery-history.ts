import mongoose, { Schema } from "mongoose";

export const MachineryHistorySchema = new mongoose.Schema(
  {
    project_id: {
      data: {
        type: Schema.Types.ObjectId,
        ref: "projects",
        required: true,
      },
      _id: { type: String, required: true },
    },
    machinery_id: {
      data: {
        type: String,
        ref: "machinery_id",
        required: true,
      },
      _id: { type: String, required: true },
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    worker_id: {
      data: { type: String, ref: "user_employees", required: true },
      _id: { type: String, required: true },
    },
    order_number: { type: String, required: true },
    guarantee: { type: String, required: true },
    note: { type: String },
    is_active: { type: Boolean, required: true, default: true },
    created_by: {
      data: {
        type: Schema.Types.ObjectId,
        ref: "user_employees",
        required: true,
      },
      _id: { type: String, required: true },
    },
    updated_by: {
      data: {
        type: Schema.Types.ObjectId,
        ref: "user_employees",
        required: true,
      },
      _id: { type: String, required: true },
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

export class MachineryHistory {
  project_id: string;
  machinery_id: string;
  date: Date;
  worker_id: string;
  order_number: string;
  guarantee: string;
  note: string;
  is_active: boolean;
  created_by: string;
  created_at: string;
  updated_by: string;
  updated_at: string;
}
