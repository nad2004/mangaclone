import { Types } from 'mongoose';
export interface IFavorite {
    _id?: Types.ObjectId; 
    user_id: Types.ObjectId;
    story_id: Types.ObjectId;
    added_at: Date;
}
