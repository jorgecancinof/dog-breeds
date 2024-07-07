import { IDogRepository } from './interfaces/IDogRepository';
import { BreedListDTO, SubBreedListDTO, ImageListDTO } from '@/infrastructure/api/dtos/dogDTO';

const BASE_URL = 'https://dog.ceo/api';

export class DogRepository implements IDogRepository {
  async getAllBreeds(): Promise<BreedListDTO> {
    const response = await fetch(`${BASE_URL}/breeds/list/all`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return (await response.json()) as BreedListDTO;
  }

  async getSubBreeds(breed: string): Promise<SubBreedListDTO> {
    const response = await fetch(`${BASE_URL}/breed/${breed}/list`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return (await response.json()) as SubBreedListDTO;
  }

  async getBreedImages(breed: string, subBreed?: string): Promise<ImageListDTO> {
    const url = subBreed ? `${BASE_URL}/breed/${breed}/${subBreed}/images` : `${BASE_URL}/breed/${breed}/images`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return (await response.json()) as ImageListDTO;
  }
}
