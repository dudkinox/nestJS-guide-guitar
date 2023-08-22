import { ApiProperty } from '@nestjs/swagger';
import mongoose, { Schema } from 'mongoose';
import { Prefix } from '../enum/user.enum';

export const UserEmployeesSchema = new mongoose.Schema(
  {
    projects_id: [
      {
        data: {
          type: Schema.Types.ObjectId,
          ref: 'projects',
          required: true,
        },
        _id: { type: String, required: true },
      },
    ],
    employee_number: { type: String, required: true },
    card_number: {
      type: String,
      required: true,
    },
    prefix: { type: String, enum: Prefix, required: true },
    other_prefix: { type: String },
    fname_th: { type: String, required: true },
    lname_th: { type: String, required: true },
    fname_en: { type: String },
    lname_en: { type: String },
    phone: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    gender: { type: String, required: true, enum: ['Male', 'Female'] },
    id_card: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role_id: {
      data: { type: Schema.Types.ObjectId, required: true, ref: 'roles' },
      _id: { type: String, required: true },
    },
    department_id: {
      data: { type: Schema.Types.ObjectId },
      _id: { type: String },
    },
    section_id: { data: { type: Schema.Types.ObjectId }, _id: String },
    position_id: { data: { type: Schema.Types.ObjectId }, _id: String },
    employee_level: {
      type: String,
      enum: ['Highest', 'High', 'Middle', 'Low'],
    },
    approver_person: { type: String },
    hired_date: { type: Date, required: true },
    release_date: { type: Date, required: true },
    packing_date: { type: Date, required: true },
    employee_type: {
      type: String,
      required: true,
      enum: ['Monthly', 'Daily', 'Hourly'],
    },
    holiday_group_id: { data: { type: Schema.Types.ObjectId }, _id: String },
    work_time_id: {
      data: { type: Schema.Types.ObjectId, required: true },
      _id: String,
    },
    workplace_id: {
      data: { type: Schema.Types.ObjectId, required: true },
      _id: String,
    },
    bank_id: { type: Number },
    account_number: { type: String },
    is_active: { type: Boolean, required: true, default: true },
    created_by: {
      data: {
        type: Schema.Types.ObjectId,
        ref: 'user_employees',
        required: true,
      },
      _id: { type: String },
    },
    updated_by: {
      data: {
        type: Schema.Types.ObjectId,
        ref: 'user_employees',
        required: true,
      },
      _id: { type: String },
    },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

export class UsersEmployees {
  @ApiProperty()
  projects_id: string;
  @ApiProperty()
  card_number: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  employee_number: string;
  @ApiProperty()
  fname_en: string;
  @ApiProperty()
  fname_th: string;
  @ApiProperty()
  gender: string;
  @ApiProperty()
  id_card: string;
  @ApiProperty()
  lname_en: string;
  @ApiProperty()
  lname_th: string;
  @ApiProperty()
  other_prefix: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  phone: string;
  @ApiProperty()
  prefix: string;
  @ApiProperty()
  role_id: number;
  @ApiProperty()
  department_id: number;
  @ApiProperty()
  section_id: number;
  @ApiProperty()
  position_id: number;
  @ApiProperty()
  approver_person: string;
  @ApiProperty()
  employee_level: string;
  @ApiProperty()
  employee_type: string;
  @ApiProperty()
  hired_date: string;
  @ApiProperty()
  packing_date: string;
  @ApiProperty()
  release_date: string;
  @ApiProperty()
  holiday_group_id: number;
  @ApiProperty()
  account_number: string;
  @ApiProperty()
  bank_id: number;
  @ApiProperty()
  work_time_id: number;
  @ApiProperty()
  workplace_id: number;
  @ApiProperty()
  created_at: string;
  @ApiProperty()
  created_by: string;
  @ApiProperty()
  is_active: boolean;
  @ApiProperty()
  updated_at: string;
  @ApiProperty()
  updated_by: string;
}
