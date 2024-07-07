import { useQuery } from '@tanstack/react-query';
import { dogApiService } from '@/infrastructure/api/dogApiService';

export const useBreeds = () => {
  return useQuery({
    queryKey: ['breeds'],
    queryFn: () => dogApiService.getBreeds(),
  });
};
