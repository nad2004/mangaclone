import { useQuery } from '@tanstack/react-query';
import axios from 'axios';  
import type { IChapter } from '@/types/chapter';
const BASE_URL = 'http://localhost:8080/api/chapters';

const fetchChapterByNum = async (storyId: string, chapterNumber: number): Promise<IChapter> => {
    const response = await axios.get<IChapter>(`${BASE_URL}/story/${storyId}/chapter/${chapterNumber}`);
    return response.data;
};

export const useFetchChapter = (storyId: string, chapterNumber: number) => {
  return useQuery({
    queryKey: ['list-chapter', storyId, chapterNumber],
    queryFn: () => fetchChapterByNum(storyId, chapterNumber),
    enabled: !!storyId && !!chapterNumber, // chỉ fetch khi có storyId và chapterNumber
  });
};