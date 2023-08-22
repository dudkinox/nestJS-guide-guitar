import mongoose, { Schema } from 'mongoose';
import {
  PickUpStatus,
  PickUpType,
} from 'src/apis/modules/spare-parts/pick-up-parts/dto/pickUpParts.dto';

import { SpareParts } from 'src/model/SparePartsModel';

export const ReturnPartsSchema = new mongoose.Schema(
  {
    date: { type: Date, required: true },
    engineer_pick_up_parts_id: {
      data: {
        type: Schema.Types.ObjectId,
        ref: 'pick_up_parts',
        required: true,
      },
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
        required: true,
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

export class ReturnParts {
  date: Date;
  type: PickUpType;
  engineer_pick_up_parts_id: string;
  spare_parts: { part: SpareParts; title_th: string; quantity: number }[];
  requester_id: string;
  inspector_id: string;
  status: PickUpStatus;
  note: string;
  not_approve_reason: string;
  is_active: boolean;
  created_at: Date;
  created_by: string;
  updated_at: Date;
  updated_by: string;
}
