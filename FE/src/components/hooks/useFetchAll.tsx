import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api';
 
function useFetchAll(url: string) {
  
  return useQuery({
    queryKey: [BASE_URL+ url],
    queryFn: async () => {
      const res = await axios.get(BASE_URL+ url);
      return res.data;
    },
    
  });
}

export default useFetchAll;
