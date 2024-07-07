import React, { useMemo } from 'react';
import Image from 'next/image';
import { Masonry } from 'masonic';
import { useDogImages } from './useDogImages';
import { ErrorBoundary } from '@/shared/components/ErrorBoundary';
import { ErrorMessage } from '@/shared/components/ErrorMessage';
import { SpinnerIcon } from '@/shared/components/SpinnerIcon';
import { useFavorites } from '@/features/favorites/useFavorites';
import { FavoriteButton } from '@/features/favorites/FavoriteButton';

interface DogImageMasonryProps {
  selectedBreed: string | null;
  selectedSubBreed: string | null;
  showFavorites: boolean;
}

interface DogImageItem {
  id: string;
  url: string;
  breed: string;
  subBreed?: string;
}

const ERROR_MESSAGE = 'Oops! Something went wrong';
const ERROR_MESSAGE_DETAIL = 'There was an error loading the images. Please try again later.';

export const DogImageMasonry = ({ selectedBreed, selectedSubBreed, showFavorites }: DogImageMasonryProps) => {
  const { data: dogImages, isLoading, isError } = useDogImages(selectedBreed, selectedSubBreed);
  const { favorites, addFavorite, removeFavorite, isFavorite } = useFavorites();

  const memoizedItems = useMemo(() => {
    if (showFavorites) {
      return favorites.map((fav) => ({
        id: fav.id,
        url: fav.imageUrl,
        breed: fav.breed,
        subBreed: fav.subBreed,
      }));
    }

    if (!dogImages) return [];
    return dogImages.imageUrls.map((url) => ({
      id: url,
      url,
      breed: selectedBreed!,
      subBreed: selectedSubBreed || undefined,
    }));
  }, [dogImages, selectedBreed, selectedSubBreed, showFavorites, favorites]);

  if (!selectedBreed && !selectedSubBreed && !showFavorites) {
    return <div className="text-center text-xl py-4">Please select a breed to see images or show favorites</div>;
  }

  if (isLoading && !showFavorites) {
    return (
      <div className="flex justify-center py-4">
        <div role="status" aria-live="polite">
          <SpinnerIcon className="h-20 w-20 text-indigo-500" />
          <span className="sr-only">Loading</span>
        </div>
      </div>
    );
  }

  if (isError && !showFavorites) {
    return <ErrorMessage title={ERROR_MESSAGE} message={ERROR_MESSAGE_DETAIL} />;
  }

  if (memoizedItems.length === 0 && !showFavorites) {
    return <div className="text-center text-xl py-4">No images available</div>;
  }

  if (memoizedItems.length === 0 && showFavorites) {
    return <div className="text-center text-xl py-4">You don&apos;t have any favorites yet</div>;
  }

  const renderDogImage = ({ data }: { data: DogImageItem }) => (
    <div className="relative">
      <Image
        src={data.url}
        alt={`Photo of a ${data.breed}${data.subBreed ? ` ${data.subBreed}` : ''}`}
        width={500}
        height={500}
        className="w-full h-auto rounded-lg"
        data-breed={data.breed}
        data-sub-breed={data.subBreed}
      />
      <div className="absolute top-2 right-2">
        <FavoriteButton
          isChecked={isFavorite(data.id)}
          onChange={(isChecked) =>
            isChecked
              ? addFavorite({
                  id: data.id,
                  breed: data.breed,
                  subBreed: data.subBreed,
                  imageUrl: data.url,
                })
              : removeFavorite(data.id)
          }
        />
      </div>
    </div>
  );

  const masonryKey = showFavorites
    ? `${memoizedItems.length}-favorites`
    : `${selectedBreed}${selectedSubBreed ? `-${selectedSubBreed}` : ''}`;

  return (
    <ErrorBoundary fallback={<ErrorMessage title={ERROR_MESSAGE} message={ERROR_MESSAGE_DETAIL} />}>
      <Masonry
        key={masonryKey}
        items={memoizedItems}
        render={renderDogImage}
        columnGutter={16}
        columnWidth={250}
        overscanBy={5}
      />
    </ErrorBoundary>
  );
};
