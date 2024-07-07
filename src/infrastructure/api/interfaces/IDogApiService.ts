import { BreedList, SubBreedList, DogImageList } from '@/shared/types/dog';

export interface IDogApiService {
  getBreeds: () => Promise<BreedList>;
  getSubBreeds: (breed: string) => Promise<SubBreedList>;
  getDogImages: (breed: string, subBreed?: string) => Promise<DogImageList>;
}
