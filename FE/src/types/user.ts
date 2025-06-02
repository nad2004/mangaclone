export interface IUser  {
  _id: string;
  username: string;
  email: string;
  password_hash?: string;
  role?: 'admin' | 'user';
  avatar?: string;
}