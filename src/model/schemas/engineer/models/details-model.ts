import mongoose from 'mongoose';

export const DetailsSchema = new mongoose.Schema({
  topic: { type: String, required: true },
  detail_type: { type: String, Enum: ['Image', 'Text'], required: true },
  detail: { type: String, required: true },
});

export class Details {
  topic: string;
  type: string;
  detail: string;
}

export class DetailsWorkSheetTemplate {
  topic: string;
  detail_type: string;
  detail: string;
}
