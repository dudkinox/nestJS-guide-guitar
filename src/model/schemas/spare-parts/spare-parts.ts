import { ApiProperty } from '@nestjs/swagger';
import mongoose, { Schema } from 'mongoose';

export const SparePartSchema = new mongoose.Schema(
  {
    projects_id: {
      data: {
        type: Schema.Types.ObjectId,
        ref: 'projects',
        required: true,
      },
      _id: String,
    },
    code: { type: String, required: true },
    title_th: { type: String, required: true },
    title_en: { type: String },
    engineer_unit_id: {
      data: { type: Schema.Types.ObjectId, ref: 'units' },
      _id: String,
    },
    model: { type: String },
    brand: { type: String },
    supplier: { type: String },
    quantity: { type: Number, default: 0 },
    image: { type: String },
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

export class SparePart {
  @ApiProperty()
  projects_id: string;
  @ApiProperty()
  code: string;
  @ApiProperty()
  title_th: string;
  @ApiProperty()
  title_en: string;
  @ApiProperty()
  image: string;
  @ApiProperty()
  quantity: number;
  @ApiProperty()
  engineer_unit_id: string;
  @ApiProperty()
  model: string;
  @ApiProperty()
  brand: string;
  @ApiProperty()
  supplier: string;
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
