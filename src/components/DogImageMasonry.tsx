import React, { useMemo } from 'react';
import Image from 'next/image';
import { Masonry } from 'masonic';
import { useDogImages } from '@/hooks/useDogImages';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { ErrorMessage } from '@/components/ErrorMessage';
import { SpinnerIcon } from './SpinnerIcon';

interface DogImageMasonryProps {
  selectedBreed: string | null;
  selectedSubBreed: string | null;
}

interface DogImageItem {
  id: string;
  url: string;
}

const ERROR_MESSAGE = 'Oops! Something went wrong';
const ERROR_MESSAGE_DETAIL = 'There was an error loading the images. Please try again later.';

export const DogImageMasonry = ({ selectedBreed, selectedSubBreed }: DogImageMasonryProps) => {
  const { data: dogImages, isLoading, isError } = useDogImages(selectedBreed, selectedSubBreed);

  const memoizedItems = useMemo(() => {
    if (!dogImages) return [];
    return dogImages.imageUrls.map((url, index) => ({
      id: `${index}-${url}`,
      url,
    }));
  }, [dogImages]);

  if (!selectedBreed && !selectedSubBreed) {
    return <div className="text-center text-xl py-4">Please select a breed to see images</div>;
  }

  if (isLoading) {
    return (
      <div className="flex justify-center py-4">
        <div role="status" aria-live="polite">
          <SpinnerIcon className="h-20 w-20 text-indigo-500" />
          <span className="sr-only">Loading</span>
        </div>
      </div>
    );
  }

  if (isError) {
    return <ErrorMessage title={ERROR_MESSAGE} message={ERROR_MESSAGE_DETAIL} />;
  }

  if (!dogImages || dogImages.imageUrls.length === 0) {
    return <div className="text-center text-xl py-4">No images available</div>;
  }

  const renderDogImage = ({ data }: { data: DogImageItem }) => (
    <Image
      src={data.url}
      alt={`${selectedBreed} ${selectedSubBreed || ''}`}
      width={500}
      height={500}
      className="w-full h-auto rounded-lg"
    />
  );

  return (
    <ErrorBoundary fallback={<ErrorMessage title={ERROR_MESSAGE} message={ERROR_MESSAGE_DETAIL} />}>
      <Masonry items={memoizedItems} render={renderDogImage} columnGutter={16} columnWidth={250} overscanBy={5} />
    </ErrorBoundary>
  );
};
