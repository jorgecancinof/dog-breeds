import { dogRepository } from '@/repositories/dogRepository';
import { Dog } from '@/models/dog';

export const dogApiService = {
  getBreeds: async (): Promise<string[]> => {
    const response = await dogRepository.getAllBreeds();
    return Object.keys(response.message);
  },

  getSubBreeds: async (breed: string): Promise<string[]> => {
    return await dogRepository.getSubBreeds(breed);
  },

  getDogImages: async (breed: string, subBreed?: string): Promise<Dog> => {
    const response = await dogRepository.getBreedImages(breed, subBreed);
    return {
      breed,
      subBreed,
      imageUrls: response.message,
    };
  },
};
