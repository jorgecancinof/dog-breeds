import { useQuery } from '@tanstack/react-query';
import { dogApiService } from '@/infrastructure/api/dogApiService';

export const useDogImages = (breed: string | null, subBreed: string | null) => {
  return useQuery({
    queryKey: ['dogImages', breed, subBreed],
    queryFn: () => (breed ? dogApiService.getDogImages(breed, subBreed || undefined) : Promise.resolve(null)),
    enabled: Boolean(breed),
  });
};
