import { Schema, model, Types, Document } from 'mongoose';
export interface IComment extends Document {
  user_id: Types.ObjectId;
  story_id: Types.ObjectId;
  chapter_id?: Types.ObjectId;   // nullable
  content: string;
  created_at?: Date;
}

const commentSchema = new Schema({
  user_id: { type: Types.ObjectId, ref: 'User', required: true },
  story_id: { type: Types.ObjectId, ref: 'Story', required: true },
  chapter_id: { type: Types.ObjectId, ref: 'Chapter' }, // optional
  content: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
});

export const Comment = model<IComment>('Comment', commentSchema);
