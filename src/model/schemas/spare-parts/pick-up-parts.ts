import mongoose, { Schema } from 'mongoose';
import {
  PickUpStatus,
  PickUpType,
} from 'src/apis/modules/spare-parts/pick-up-parts/dto/pickUpParts.dto';
import { SpareParts } from 'src/model/SparePartsModel';

export const PickUpPartsSchema = new mongoose.Schema(
  {
    projects_id: {
      data: {
        type: Schema.Types.ObjectId,
        ref: 'projects',
        required: true,
      },
      _id: String,
    },
    date: { type: Date, required: true },
    title_th: { type: String },
    title_en: { type: String },
    engineer_repair_id: {
      data: { type: Schema.Types.ObjectId, ref: 'repairs' },
      _id: String,
    },
    spare_parts: [
      {
        data: {
          type: Schema.Types.ObjectId,
          ref: 'spare_parts',
          required: true,
        },
        _id: String,
        quantity: Number,
      },
    ],
    requester_id: {
      data: {
        type: Schema.Types.ObjectId,
        ref: 'user_employees',
        required: true,
      },
      _id: String,
    },
    inspector_id: {
      data: {
        type: Schema.Types.ObjectId,
        ref: 'user_employees',
      },
      _id: String,
    },
    status: {
      type: String,
      required: true,
      default: PickUpStatus.Waiting,
    },
    note: { type: String },
    not_approve_reason: { type: String },
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

export class PickUpParts {
  date: Date;
  projects_id: string;
  title_th: string;
  title_en: string;
  is_repair: boolean;
  engineer_repair_id: number;
  type: PickUpType;
  spare_parts: SpareParts[];
  requester_id: number;
  inspector_id: number;
  status: PickUpStatus;
  note: string;
  not_approve_reason: string;
  is_active: boolean;
  created_at: Date;
  created_by: string;
  updated_at: Date;
  updated_by: string;
}
