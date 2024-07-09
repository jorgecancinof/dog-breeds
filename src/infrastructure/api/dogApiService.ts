import { IDogApiService } from './interfaces/IDogApiService';
import { IDogRepository } from './interfaces/IDogRepository';
import { DogRepository } from './dogRepository';
import { BreedList, SubBreedList, DogImageList } from '@/shared/types/dog';

export class DogApiService implements IDogApiService {
  private repository: IDogRepository;

  constructor(repository: IDogRepository) {
    this.repository = repository;
  }

  async getBreeds(): Promise<BreedList> {
    const response = await this.repository.getAllBreeds();
    return Object.keys(response.message);
  }

  async getSubBreeds(breed: string): Promise<SubBreedList> {
    const response = await this.repository.getSubBreeds(breed);
    return response.message;
  }

  async getDogImages(breed: string, subBreed?: string): Promise<DogImageList> {
    const response = await this.repository.getBreedImages(breed, subBreed);
    return {
      breed,
      subBreed,
      imageUrls: response.message,
    };
  }
}

const dogRepository = new DogRepository();
export const dogApiService = new DogApiService(dogRepository);
