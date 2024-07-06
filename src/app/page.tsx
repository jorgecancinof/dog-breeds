'use client';

import React from 'react';
import Image from 'next/image';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BreedSelector } from '@/components/BreedSelector';
import { SubBreedSelector } from '@/components/SubBreedSelector';
import { DogImageMasonry } from '@/components/DogImageMasonry';
import icon from '@/app/icon.svg';

const queryClient = new QueryClient();

export default function Home() {
  const [selectedBreed, setSelectedBreed] = React.useState<string | null>(null);
  const [selectedSubBreed, setSelectedSubBreed] = React.useState<string | null>(null);

  const handleBreedSelect = (breed: string | null) => {
    setSelectedBreed(breed);
    setSelectedSubBreed(null);
  };

  const handleSubBreedSelect = (subBreed: string | null) => {
    setSelectedSubBreed(subBreed);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <main className="container mx-auto px-4 lg:px-8 py-8">
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
        <div className="flex flex-col-reverse md:flex-row items-center gap-10 mb-8">
          <div className="w-full md:max-w-xl">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Dog Breeds</h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Explore a diverse gallery of dog breeds and sub-breeds. Filter and discover beautiful canine images from
              around the world.
            </p>
            <div className="flex flex-col lg:flex-row gap-4 mt-6">
              <BreedSelector selectedBreed={selectedBreed} onBreedSelect={handleBreedSelect} />
              <SubBreedSelector
                selectedBreed={selectedBreed}
                selectedSubBreed={selectedSubBreed}
                onSubBreedSelect={handleSubBreedSelect}
              />
            </div>
          </div>
          <div className="w-full flex justify-center">
            <Image src={icon} alt="Dog icon" width={500} height={500} priority />
          </div>
        </div>
        <DogImageMasonry selectedBreed={selectedBreed} selectedSubBreed={selectedSubBreed} />
        <div aria-hidden="true" className="absolute inset-x-0 top-0 -z-10 transform-gpu overflow-hidden blur-3xl">
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          />
        </div>
      </main>
    </QueryClientProvider>
  );
}
