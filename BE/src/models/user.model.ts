import { Schema, model } from 'mongoose';
import { Document } from 'mongoose';
export interface IUser extends Document {
  username: string;
  email: string;
  password_hash?: string;
  role?: 'admin' | 'user';
  avatar?: string;
  created_at?: Date;
  googleId?: string;
  forgot_password_otp?: string;
  forgot_password_expiry?: Date;
  refresh_token?: string;
  otp?: string;
  otpExpiry?: Date;
  is_active?: boolean;
}
const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email:    { type: String, required: true, unique: true },
  password_hash: {
    type: String,
    required: function(this: IUser) {

      return !this.googleId;
    },
  },
  avatar: { type: String, default: null },
  role: { type: String, enum: ['admin', 'user'], default: 'user' },
  created_at: { type: Date, default: Date.now },
  googleId: {type: String,default: null,unique: true,},
  forgot_password_otp: {type: String,default: null},
  forgot_password_expiry: {type: Date,default: null},
  refresh_token: {type: String,default: ""},
  otp: { type: String,default: null},
  otpExpiry: { type: Date,default: null},
  is_active: { type: Boolean, default: true },
});

export const User = model<IUser>('User', userSchema);
