import { BreedListDTO, SubBreedListDTO, ImageListDTO } from '@/infrastructure/api/dtos/dogDTO';

export interface IDogRepository {
  getAllBreeds: () => Promise<BreedListDTO>;
  getSubBreeds: (breed: string) => Promise<SubBreedListDTO>;
  getBreedImages: (breed: string, subBreed?: string) => Promise<ImageListDTO>;
}
