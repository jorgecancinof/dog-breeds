import { useQuery } from '@tanstack/react-query';
import { dogApiService } from '@/services/dogApiService';

export const useSubBreeds = (breed: string | null) => {
  return useQuery({
    queryKey: ['subBreeds', breed],
    queryFn: () => (breed ? dogApiService.getSubBreeds(breed) : Promise.resolve([])),
    enabled: Boolean(breed),
  });
};
