import { Chapter, IChapter } from '../models/chapter.model';
import mongoose from 'mongoose';

export const getChaptersByStoryId = async (storyId: string): Promise<IChapter[]> => {
  if (!mongoose.Types.ObjectId.isValid(storyId)) {
    throw new Error('ID không hợp lệ');
  }
  const chapters = await Chapter.find( { story_id: storyId } ).sort({ chapter_number: -1 }); // sort optional
  return chapters;
};
