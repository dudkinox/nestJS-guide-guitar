import mongoose, { Schema } from "mongoose";

export const EngineerWorksheetCheckSchema = new mongoose.Schema(
  {
    answer_id: {
      data: {
        type: Schema.Types.ObjectId,
        ref: "answers",
        required: true,
      },
      _id: { type: String, required: true },
    },
    checker_id: {
      data: {
        type: Schema.Types.ObjectId,
        ref: "user_employees",
        required: true,
      },
      _id: { type: String, required: true },
    },
    checker_index: {
      type: Number,
    },
    result: {
      type: String,
      Enum: ["Pass", "NotPass"],
    },
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

export class WorksheetCheck {
  answer_id: string;
  checker_id: string;
  checker_index: number;
  result: string;
  is_active: boolean;
  created_by: string;
  updated_by: string;
}
