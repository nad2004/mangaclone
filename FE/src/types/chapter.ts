
export interface IChapter {
  _id: string;
  story_id: string;
  chapter_number: number;
  title: string;
  content: string[];  
  created_at: Date;
}
