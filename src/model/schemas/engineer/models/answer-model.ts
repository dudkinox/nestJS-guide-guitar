import mongoose, { Schema } from 'mongoose';

export const AnswerSchema = new mongoose.Schema(
  {
    questions_id: {
      data: {
        type: Schema.Types.ObjectId,
        ref: 'questions',
        required: true,
      },
      _id: { type: String, required: true },
    },
    choices_id: {
      data: { type: Schema.Types.ObjectId, ref: 'choices' },
      _id: { type: String },
    },
    answer_type: {
      type: String,
      Enum: ['Image', 'File', 'PassNotPassNA'],
    },
    answer: {
      type: String,
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
      _id: { type: String, required: true },
    },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

export class AnswerModel {
  engineer_worksheet_template_id: string;
  questions_id: string;
  choices_id: string;
  answer_type: string;
  answer: string;
  is_active: boolean;
  created_by: string;
  updated_by: string;
}
