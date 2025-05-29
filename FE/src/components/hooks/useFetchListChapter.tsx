import { useQuery } from '@tanstack/react-query';
import axios from 'axios';  
import type { IChapter } from '@/types/chapter';
const BASE_URL = 'http://localhost:8080/api/chapters';

const fetchListChapter = async (storyId: string): Promise<IChapter[]> => {
    const response = await axios.get<IChapter[]>(`${BASE_URL}/story/${storyId}`);
    return response.data;
};

export const useFetchListChapter = (storyId: string) => {
  return useQuery({
    queryKey: ['list-chapter', storyId],
    queryFn: () => fetchListChapter(storyId),
    enabled: !!storyId, // chỉ fetch khi có storyId
  });
};