import { useQuery } from '@tanstack/react-query';
import axios from 'axios';  

const BASE_URL = 'http://localhost:8080/api';

const fetchOne = async (id: string, url: string) => {
    const response = await axios.get(`${BASE_URL}/${url}/${id}`);
    return response.data;
};

export const useFetchOne = (id: string, url: string) => {
  return useQuery({
    queryKey: ['story-detail', id],
    queryFn: () => fetchOne(id, url),
    enabled: !!id, // chỉ fetch khi có id
  });
};