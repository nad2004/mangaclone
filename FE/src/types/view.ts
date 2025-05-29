import { Types } from 'mongoose';
export interface IView {
  _id?: Types.ObjectId;
  story_id: Types.ObjectId;
  chapter_id?: Types.ObjectId;    // nullable
  view_count: number;
  updated_at?: Date;
}
