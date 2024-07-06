import { useQuery } from '@tanstack/react-query';
import { dogApiService } from '@/services/dogApiService';

export const useBreeds = () => {
  return useQuery({
    queryKey: ['breeds'],
    queryFn: dogApiService.getBreeds,
  });
};
