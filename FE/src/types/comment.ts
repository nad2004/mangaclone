import { Types } from 'mongoose';
export interface IComment {
  _id?: Types.ObjectId;
  user_id: Types.ObjectId;
  story_id: Types.ObjectId;
  chapter_id?: Types.ObjectId;   // nullable
  content: string;
  created_at?: Date;
}
