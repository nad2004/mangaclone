
export interface IStory {
  _id: string;
  title: string;
  author: string;
  description: string;
  cover_image: string;
  status: 'ongoing' | 'completed';
  categories: string[]; 
  created_at: Date;
}
