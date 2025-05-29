import { Schema, model, Types, Document } from 'mongoose';
export interface IFavorite extends Document {
    user_id: Types.ObjectId;
    story_id: Types.ObjectId;
    added_at: Date;
}

const favoriteSchema = new Schema({
  user_id: { type: Types.ObjectId, ref: 'User', required: true },
  story_id: { type: Types.ObjectId, ref: 'Story', required: true },
  added_at: { type: Date, default: Date.now },
}, { timestamps: false });

favoriteSchema.index({ user_id: 1, story_id: 1 }, { unique: true }); // composite key

export const Favorite = model<IFavorite>('Favorite', favoriteSchema);
