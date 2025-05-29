import { Schema, model, Types, Document } from 'mongoose';

export interface IStory extends Document {
  title: string;
  author: string;
  description: string;
  cover_image: string;
  status: 'ongoing' | 'completed';
  categories: Types.ObjectId[]; 
  created_at: Date;
}

const storySchema = new Schema({
  title: { type: String, required: true },
  author: { type: String },
  description: { type: String },
  cover_image: { type: String },
  status: { type: String, enum: ['ongoing', 'completed'], default: 'ongoing' },
  categories: [{ type: Types.ObjectId, ref: 'Category' }], // relation N:N
  created_at: { type: Date, default: Date.now },
});

export const Story = model<IStory>('Story', storySchema);
