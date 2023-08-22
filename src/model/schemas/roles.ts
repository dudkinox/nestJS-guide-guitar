import { ApiProperty } from "@nestjs/swagger";
import mongoose, { Schema } from "mongoose";
import { SystemsDto } from "src/apis/modules/systems/dto/systems.dto";

export const RolesSchema = new mongoose.Schema(
  {
    projects_id: {
      data: {
        type: Schema.Types.ObjectId,
        ref: "projects",
        required: true,
      },
      _id: { type: String, required: true },
    },
    title_th: { type: String, required: true },
    title_en: { type: String },
    description_th: { type: String },
    description_en: { type: String },
    systems: [
      {
        systems_id: {
          type: Number,
          required: true,
        },
        permissions: [
          {
            permissions_id: {
              type: Number,
              required: true,
            },
            is_active: {
              type: Boolean,
              required: true,
              default: true,
            },
          },
        ],
        is_active: {
          type: Boolean,
          required: true,
          default: true,
        },
      },
    ],
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

export class Roles {
  @ApiProperty()
  projects_id: string;
  @ApiProperty()
  title_th: string;
  @ApiProperty()
  title_en: string;
  @ApiProperty()
  description_th: string;
  @ApiProperty()
  description_en: string;
  @ApiProperty()
  systems: SystemsDto[];
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
