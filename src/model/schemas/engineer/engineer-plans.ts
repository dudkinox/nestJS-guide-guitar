import mongoose, { Schema } from 'mongoose';

export const EngineerPlansSchema = new mongoose.Schema(
  {
    projects_id: {
      data: {
        type: Schema.Types.ObjectId,
        ref: 'projects',
        required: true,
      },
      _id: { type: String, required: true },
    },
    code: { type: String },
    title_th: { type: String, required: true },
    title_en: { type: String },
    operation_date: { type: Date },
    start_time: { type: String },
    end_time: { type: String },
    engineer_system_id: {
      data: { type: Schema.Types.ObjectId, ref: 'systems' },
      _id: String,
    },
    engineer_work_type_id: {
      data: { type: Schema.Types.ObjectId, ref: 'work_types' },
      _id: String,
    },
    engineer_service_area_id: {
      data: {
        type: Schema.Types.ObjectId,
        ref: 'service_areas',
      },
      _id: String,
    },
    machinery_id: {
      data: { type: Schema.Types.ObjectId, ref: 'machineries' },
      _id: { type: String },
    },
    engineer_frequency_id: {
      data: { type: Schema.Types.ObjectId, ref: 'frequencies' },
      _id: String,
    },
    engineer_worksheet_template_id: {
      data: {
        type: Schema.Types.ObjectId,
        ref: 'worksheet_templates',
      },
      _id: String,
    },
    owner_work: {
      data: {
        type: Schema.Types.ObjectId,
        ref: 'user_employees',
      },
      _id: String,
    },
    cancle_reason: { type: String },
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
    related_files: { type: String },
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
    detail_th: { type: String },
    detail_en: { type: String },
    engineer_checker_team_id: {
      data: {
        type: Schema.Types.ObjectId,
        ref: 'checker_teams',
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

export class EngineerPlan {
  project_id: string;
  code: string;
  title_th: string;
  title_en: string;
  operation_date: Date;
  start_time: string;
  end_time: string;
  engineer_system_id: string;
  engineer_work_type_id: string;
  engineer_service_area_id: string;
  machinery_id: string;
  engineer_frequency_id: string;
  engineer_worksheet_template_id: string;
  owner_work: string;
  worker: string;
  answer: string[];
  start_at: Date;
  end_at: Date;
  cancle_reason: string;
  start_by: string;
  end_by: string;
  related_file: string;
  detail_th: string;
  detail_en: string;
  engineer_checker_team_id: string;
  is_active: boolean;
  created_by: string;
  updated_by: string;
  created_at: Date;
  updated_at: Date;
}
