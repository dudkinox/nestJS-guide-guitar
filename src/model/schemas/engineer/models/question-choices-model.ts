import mongoose, { Schema } from 'mongoose';

export const QuestionChoicesSchema = new mongoose.Schema({
  title: { type: String },
});
export class QuestionChoices {
  title: string;
}
