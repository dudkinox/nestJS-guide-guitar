import mongoose, { Schema } from 'mongoose';
import { Choices } from './choices-model';
import { QuestionChoicesSchema } from './question-choices-model';

export const QuestionsModelSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    type: {
      type: String,
      enum: [
        'SingleInput',
        'CheckBox',
        'RadioGroup',
        'DropDown',
        'Image',
        'PassNotPass',
        'File',
      ],
      required: true,
    },
    choices: [
      { data: { type: QuestionChoicesSchema, ref: 'choices' }, _id: String },
    ],
    is_required: { type: Boolean, required: true, default: false },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

export class QuestionWorkSheetTemplate {
  title: string;
  type: string;
  choices: Choices[];
  is_required: boolean;
}
