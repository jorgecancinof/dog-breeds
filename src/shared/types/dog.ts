export type BreedList = string[];

export type SubBreedList = string[];

export interface DogImageList {
  breed: string;
  subBreed?: string;
  imageUrls: string[];
}
