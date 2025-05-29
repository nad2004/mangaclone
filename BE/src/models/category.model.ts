import { Schema, model, Document } from 'mongoose';
export interface ICategory extends Document {
  name: string;
  description: string;
}

const categorySchema = new Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
});

export const Category = model<ICategory>('Category', categorySchema);
