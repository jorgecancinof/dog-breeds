'use client';

import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { BreedSelector } from '@/features/breedSelection/BreedSelector';
import { SubBreedSelector } from '@/features/breedSelection/SubBreedSelector';
import { DogImageMasonry } from '@/features/dogImageGallery/DogImageMasonry';
import { ShowFavoritesButton } from '@/features/favorites/ShowFavoritesButton';
import { DogHead3D } from '@/features/dogHead3D/DogHead3D';
import { PawIcon } from '@/shared/components/icons/PawIcon';

const queryClient = new QueryClient();

const Title = () => {
  return (
    <div className="flex items-center justify-center lg:justify-normal gap-2">
      <PawIcon className="w-12 h-12 p-1 bg-pink-600 rounded-full text-white" />
      <h1 className="leading-relaxed sm:leading-relaxed text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl bg-gradient-to-l from-pink-500 to-pink-600 bg-clip-text text-transparent">
        DogBreeds
      </h1>
    </div>
  );
};

const BackgroundDecoration = () => {
  return (
    <>
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
      >
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
        />
      </div>
      <div aria-hidden="true" className="absolute inset-x-0 top-0 -z-10 transform-gpu overflow-hidden blur-3xl">
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
        />
      </div>
    </>
  );
};

export default function Home() {
  const [selectedBreed, setSelectedBreed] = useState<string | null>(null);
  const [selectedSubBreed, setSelectedSubBreed] = useState<string | null>(null);
  const [showFavorites, setShowFavorites] = useState(false);

  const handleBreedSelect = (breed: string | null) => {
    setSelectedBreed(breed);
    setSelectedSubBreed(null);
    if (breed) {
      setShowFavorites(false);
    }
  };

  const handleSubBreedSelect = (subBreed: string | null) => {
    setSelectedSubBreed(subBreed);
    if (subBreed) {
      setShowFavorites(false);
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <main className="container mx-auto px-4 lg:px-8 py-8">
        <BackgroundDecoration />
        <div className="flex flex-col-reverse lg:flex-row items-center gap-10 mb-8">
          <div className="w-full md:max-w-xl">
            <Title />
            <p className="mt-1 text-lg leading-8 text-pink-900">
              Explore a diverse gallery of dog breeds and sub-breeds. Filter and discover beautiful canine images from
              around the world.
            </p>
            <div className="flex flex-col gap-4 mt-6">
              <div className="flex flex-col xl:flex-row gap-4">
                <BreedSelector selectedBreed={selectedBreed} onBreedSelect={handleBreedSelect} />
                <SubBreedSelector
                  selectedBreed={selectedBreed}
                  selectedSubBreed={selectedSubBreed}
                  onSubBreedSelect={handleSubBreedSelect}
                />
              </div>
              <ShowFavoritesButton isChecked={showFavorites} onChange={setShowFavorites} label="Show favorites" />
            </div>
          </div>
          <div className="w-full flex justify-center">
            <DogHead3D />
          </div>
        </div>
        <DogImageMasonry
          selectedBreed={selectedBreed}
          selectedSubBreed={selectedSubBreed}
          showFavorites={showFavorites}
        />
      </main>
    </QueryClientProvider>
  );
}
