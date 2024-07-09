import React, { useMemo } from 'react';
import Image from 'next/image';
import { Masonry } from 'masonic';
import { useDogImages } from './useDogImages';
import { ErrorBoundary } from '@/shared/components/errors/ErrorBoundary';
import { ErrorMessage } from '@/shared/components/alerts/ErrorMessage';
import { useFavorites } from '@/features/favorites/useFavorites';
import { FavoriteButton } from '@/features/favorites/FavoriteButton';
import { Loading } from '@/shared/components/indicators/Loading';
import { InfoMessage } from '@/shared/components/alerts/InfoMessage';
import { NoFavoritesMessage } from '@/features/favorites/NoFavoritesMessage';

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
    return null;
  }

  if (isLoading && !showFavorites) {
    return <Loading />;
  }

  if (isError && !showFavorites) {
    return <ErrorMessage title={ERROR_MESSAGE} message={ERROR_MESSAGE_DETAIL} />;
  }

  if (memoizedItems.length === 0 && !showFavorites) {
    return <InfoMessage title="No images available" message="Please select another breed or sub-breed." />;
  }

  if (memoizedItems.length === 0 && showFavorites) {
    return <NoFavoritesMessage />;
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
