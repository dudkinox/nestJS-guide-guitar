import mongoose, { Schema } from 'mongoose';

export const EngineerCheckerTeamSchema = new mongoose.Schema(
  {
    projects_id: {
      data: {
        type: Schema.Types.ObjectId,
        ref: 'projects',
        required: true,
      },
      _id: String,
    },
    code: { type: String },
    title_th: { type: String, required: true },
    title_en: { type: String },
    check_type: { type: String, enum: ['Sequent', 'NoSequent'] },
    first_checker: [
      {
        data: { type: Schema.Types.ObjectId, ref: 'user_employees' },
        _id: String,
      },
    ],
    second_checker: [
      {
        data: { type: Schema.Types.ObjectId, ref: 'user_employees' },
        _id: String,
      },
    ],
    third_checker: [
      {
        data: { type: Schema.Types.ObjectId, ref: 'user_employees' },
        _id: String,
      },
    ],
    fourth_checker: [
      {
        data: { type: Schema.Types.ObjectId, ref: 'user_employees' },
        _id: String,
      },
    ],
    fifth_checker: [
      {
        data: { type: Schema.Types.ObjectId, ref: 'user_employees' },
        _id: String,
      },
    ],
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

export class EngineerCheckerTeam {
  projects_id: string;
  code: string;
  title_th: string;
  title_en: string;
  check_type: string;
  first_checker: string[];
  second_checker: string[];
  third_checker: string[];
  fourth_checker: string[];
  fifth_checker: string[];
  is_active: boolean;
  created_by: string;
  updated_by: string;
  created_at: Date;
  updated_at: Date;
}
