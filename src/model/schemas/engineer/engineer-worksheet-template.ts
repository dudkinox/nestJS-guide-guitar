import mongoose, { Schema } from 'mongoose';
import { QuestionWorkSheetTemplate } from './models/questions-model';
import {
  DetailsSchema,
  DetailsWorkSheetTemplate,
} from './models/details-model';
import { HeaderModel } from './models/header-model';
import { QuestionChoicesSchema } from './models/question-choices-model';

export const EngineerWorksheetTemplateSchema = new mongoose.Schema(
  {
    projects_id: {
      data: {
        type: Schema.Types.ObjectId,
        ref: 'projects',
        required: true,
      },
      _id: { type: String, required: true },
    },
    header: {
      header_title: { type: String, required: true },
      header_description: { type: String },
      header_image: { type: String },
      header_file: { type: String },
    },
    details: [
      {
        data: {
          type: DetailsSchema,
          ref: 'details',
        },
        _id: { type: String, required: true },
      },
    ],
    questions: [
      {
        data: {
          type: QuestionChoicesSchema,
          ref: 'questions',
        },
        _id: { type: String, required: true },
      },
    ],
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

export class EngineerWorksheetTemplate {
  projects_id: string;
  header: HeaderModel;
  details: DetailsWorkSheetTemplate[];
  question: QuestionWorkSheetTemplate[];
  is_active: boolean;
  created_by: string;
  updated_by: string;
  created_at: Date;
  updated_at: Date;
}
