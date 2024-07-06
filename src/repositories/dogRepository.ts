import { BreedListDTO, ImageListDTO } from '@/dtos/dogDTO';

const BASE_URL = 'https://dog.ceo/api';

export const dogRepository = {
  getAllBreeds: async (): Promise<BreedListDTO> => {
    const response = await fetch(`${BASE_URL}/breeds/list/all`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return (await response.json()) as BreedListDTO;
  },

  getSubBreeds: async (breed: string): Promise<string[]> => {
    const response = await fetch(`${BASE_URL}/breed/${breed}/list`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = (await response.json()) as { message: string[] };
    return data.message;
  },

  getBreedImages: async (breed: string, subBreed?: string): Promise<ImageListDTO> => {
    const url = subBreed ? `${BASE_URL}/breed/${breed}/${subBreed}/images` : `${BASE_URL}/breed/${breed}/images`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return (await response.json()) as ImageListDTO;
  },
};
