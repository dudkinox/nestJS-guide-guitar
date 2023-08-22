import { ApiProperty } from "@nestjs/swagger";
import mongoose, { Schema } from "mongoose";

export const PermissionsSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
    },
    title_th: { type: String, required: true },
    title_en: { type: String },
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

export class PermissionsModel {
  @ApiProperty()
  id: number;
  @ApiProperty()
  title_th: string;
  @ApiProperty()
  title_en: string;
  @ApiProperty()
  is_active: boolean;
  @ApiProperty()
  created_by: string;
  @ApiProperty()
  updated_by: string;
  @ApiProperty()
  created_at: Date;
  @ApiProperty()
  updated_at: Date;
}
