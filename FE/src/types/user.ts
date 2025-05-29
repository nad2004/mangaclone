export interface IUser  {
  username: string;
  email: string;
  password_hash?: string;
  role?: 'admin' | 'user';
  avatar?: string;
}