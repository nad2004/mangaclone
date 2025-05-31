import axios from "axios";
import type { IChapter } from "@/types/chapter";

const BASE_URL = "http://localhost:8080/api/chapters";
export const fetchLastChapter = async (storyId: string) : Promise<IChapter>=> {
  const response = await axios.get<IChapter>(`${BASE_URL}/story/${storyId}/last`);
  return response.data;
}
export const fetchFirstChapter = async (storyId: string) : Promise<IChapter>=> {
  const response = await axios.get<IChapter>(`${BASE_URL}/story/${storyId}/first`);
  return response.data;
}