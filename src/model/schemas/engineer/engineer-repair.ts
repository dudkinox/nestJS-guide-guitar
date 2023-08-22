import { ApiProperty } from '@nestjs/swagger';
import mongoose, { Schema } from 'mongoose';
import { RepairType } from 'src/apis/modules/engineer/engineer-repair/dto/Repair.dto';

export const EngineerRepairSchema = new mongoose.Schema(
  {
    projects_id: {
      data: {
        type: Schema.Types.ObjectId,
        ref: 'projects',
        required: true,
      },
      _id: { type: String, required: true },
    },
    code: { type: String, required: true },
    image: { type: String },
    title_th: { type: String, required: true },
    title_en: { type: String },
    type: { type: String, enum: ['Machinery', 'General'] },
    machinery_id: {
      data: { type: Schema.Types.ObjectId, ref: 'machineries' },
      _id: { type: String },
    },
    repair_topic_th: { type: String },
    repair_topic_en: { type: String },
    detail_th: { type: String, required: true },
    detail_en: { type: String },
    engineer_service_area_id: {
      data: {
        type: Schema.Types.ObjectId,
        ref: 'service_areas',
        required: true,
      },
      _id: { type: String },
    },
    engineer_place_id: {
      data: {
        type: Schema.Types.ObjectId,
        ref: 'places',
        required: true,
      },
      _id: String,
    },
    engineer_system_id: {
      data: {
        type: Schema.Types.ObjectId,
        ref: 'systems',
        required: true,
      },
      _id: String,
    },
    engineer_worksheet_template_id: {
      data: {
        type: Schema.Types.ObjectId,
        ref: 'worksheet_templates',
        required: true,
      },
      _id: String,
    },
    engineer_checker_team_id: {
      data: {
        type: Schema.Types.ObjectId,
        ref: 'checker_teams',
        required: true,
      },
      _id: String,
    },
    worker_id: {
      data: {
        type: Schema.Types.ObjectId,
        ref: 'user_employees',
      },
      _id: String,
    },
    answer: [
      {
        data: {
          type: Schema.Types.ObjectId,
          ref: 'answers',
        },
        _id: String,
      },
    ],
    cancle_reason: { type: String },
    has_pick_up_parts: { type: Boolean, required: true, default: false },
    note: { type: String },
    status: {
      type: String,
      enum: [
        'Waiting',
        'Processing',
        'NotDone',
        'Checking',
        'Successed',
        'NotSucceed',
        'Canceled',
      ],
      default: 'NotDone',
    },
    start_at: { type: Date },
    end_at: { type: Date },
    start_by: {
      data: {
        type: Schema.Types.ObjectId,
        ref: 'user_employees',
      },
      _id: String,
    },
    end_by: {
      data: {
        type: Schema.Types.ObjectId,
        ref: 'user_employees',
      },
      _id: String,
    },
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
      _id: String,
    },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

export class EngineerRepair {
  @ApiProperty()
  projects_id: string;
  @ApiProperty()
  code: string;
  @ApiProperty()
  image: string;
  @ApiProperty()
  title_th: string;
  @ApiProperty()
  title_en: string;
  @ApiProperty()
  type: RepairType;
  @ApiProperty()
  machinery_id: number;
  @ApiProperty()
  repair_topic_th: string;
  @ApiProperty()
  repair_topic_en: string;
  @ApiProperty()
  detail_th: string;
  @ApiProperty()
  cancle_reason: string;
  @ApiProperty()
  detail_en: string;
  @ApiProperty()
  engineer_service_area_id: number;
  @ApiProperty()
  engineer_place_id: number;
  @ApiProperty()
  engineer_system_id: number;
  @ApiProperty()
  engineer_worksheet_template_id: number;
  @ApiProperty()
  engineer_checker_team_id: number;
  @ApiProperty()
  worker_id: string;
  @ApiProperty()
  has_pick_up_parts: boolean;
  @ApiProperty()
  note: string;
  @ApiProperty()
  is_active: boolean;
  @ApiProperty()
  created_at: Date;
  @ApiProperty()
  created_by: string;
  @ApiProperty()
  updated_at: Date;
  @ApiProperty()
  updated_by: string;
}
