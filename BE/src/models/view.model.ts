import { Schema, model, Types, Document } from 'mongoose';
export interface IView extends Document {
  story_id: Types.ObjectId;
  chapter_id?: Types.ObjectId;    // nullable
  view_count: number;
  updated_at?: Date;
}

const viewSchema = new Schema({
  story_id: { type: Types.ObjectId, ref: 'Story', required: true },
  chapter_id: { type: Types.ObjectId, ref: 'Chapter' }, // optional
  view_count: { type: Number, default: 0 },
  updated_at: { type: Date, default: Date.now },
});

export const View = model<IView>('View', viewSchema);
