import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { DogApiService } from '../dogApiService';
import { IDogRepository } from '../interfaces/IDogRepository';
import { BreedListDTO, SubBreedListDTO, ImageListDTO } from '@/infrastructure/api/dtos/dogDTO';

describe('dogApiService', () => {
  let dogApiService: DogApiService;
  const mockRepository = {
    getAllBreeds: vi.fn(),
    getSubBreeds: vi.fn(),
    getBreedImages: vi.fn(),
  };

  beforeEach(() => {
    vi.resetAllMocks();
    dogApiService = new DogApiService(mockRepository as IDogRepository);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('getBreeds', () => {
    it('should return an array of breed names', async () => {
      const mockBreeds: BreedListDTO = {
        message: {
          akita: [],
          bulldog: ['boston', 'english', 'french'],
          hound: ['afghan', 'plott', 'walker'],
        },
        status: 'success',
      };
      mockRepository.getAllBreeds.mockResolvedValue(mockBreeds);

      const result = await dogApiService.getBreeds();

      expect(result).toEqual(['akita', 'bulldog', 'hound']);
      expect(mockRepository.getAllBreeds).toHaveBeenCalledTimes(1);
    });
  });

  describe('getSubBreeds', () => {
    it('should return an array of sub-breed names', async () => {
      const mockSubBreeds: SubBreedListDTO = {
        message: ['afghan', 'plott', 'walker'],
        status: 'success',
      };
      mockRepository.getSubBreeds.mockResolvedValue(mockSubBreeds);

      const result = await dogApiService.getSubBreeds('hound');

      expect(result).toEqual(['afghan', 'plott', 'walker']);
      expect(mockRepository.getSubBreeds).toHaveBeenCalledWith('hound');
    });

    it('should handle empty sub-breed list', async () => {
      const mockSubBreeds: SubBreedListDTO = { message: [], status: 'success' };
      mockRepository.getSubBreeds.mockResolvedValue(mockSubBreeds);

      const result = await dogApiService.getSubBreeds('akita');

      expect(result).toEqual([]);
    });

    it('should throw an error if breed is not found', async () => {
      const errorResponse = {
        status: 'error',
        message: 'Breed not found (master breed does not exist)',
        code: 404,
      };
      mockRepository.getSubBreeds.mockRejectedValue(new Error(JSON.stringify(errorResponse)));

      await expect(dogApiService.getSubBreeds('nonexistent')).rejects.toThrow('Breed not found');
    });
  });

  describe('getDogImages', () => {
    it('should return an object with breed, subBreed, and imageUrls', async () => {
      const mockImages: ImageListDTO = {
        message: [
          'https://images.dog.ceo/breeds/hound-afghan/n02088094_1003.jpg',
          'https://images.dog.ceo/breeds/hound-afghan/n02088094_10263.jpg',
          'https://images.dog.ceo/breeds/hound-afghan/n02088094_988.jpg',
        ],
        status: 'success',
      };
      mockRepository.getBreedImages.mockResolvedValue(mockImages);

      const result = await dogApiService.getDogImages('hound', 'afghan');

      expect(result).toEqual({
        breed: 'hound',
        subBreed: 'afghan',
        imageUrls: [
          'https://images.dog.ceo/breeds/hound-afghan/n02088094_1003.jpg',
          'https://images.dog.ceo/breeds/hound-afghan/n02088094_10263.jpg',
          'https://images.dog.ceo/breeds/hound-afghan/n02088094_988.jpg',
        ],
      });
      expect(mockRepository.getBreedImages).toHaveBeenCalledWith('hound', 'afghan');
    });

    it('should throw an error if breed is not found', async () => {
      const errorResponse = {
        status: 'error',
        message: 'Breed not found (master breed does not exist)',
        code: 404,
      };
      mockRepository.getBreedImages.mockRejectedValue(new Error(JSON.stringify(errorResponse)));

      await expect(dogApiService.getDogImages('nonexistent')).rejects.toThrow('Breed not found');
    });
  });
});
