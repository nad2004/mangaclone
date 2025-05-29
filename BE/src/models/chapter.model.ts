import { Schema, model, Types, Document } from 'mongoose';

export interface IChapter extends Document {
  story_id: Types.ObjectId;
  chapter_number: number;
  title: string;
  content: string[];  
  created_at: Date;
}

const chapterSchema = new Schema({
  story_id: { type: Types.ObjectId, ref: 'Story', required: true },
  chapter_number: { type: Number, required: true },
  title: { type: String },
  content: [{ type: String }],
  created_at: { type: Date, default: Date.now },
});

export const Chapter = model<IChapter>('Chapter', chapterSchema);
