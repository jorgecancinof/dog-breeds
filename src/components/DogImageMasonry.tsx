import React, { useMemo } from 'react';
import Image from 'next/image';
import { Masonry } from 'masonic';
import { useDogImages } from '@/hooks/useDogImages';

interface DogImageMasonryProps {
  selectedBreed: string | null;
  selectedSubBreed: string | null;
}

interface DogImageItem {
  id: string;
  url: string;
}

export const DogImageMasonry = ({ selectedBreed, selectedSubBreed }: DogImageMasonryProps) => {
  const { data: dogImages, isLoading } = useDogImages(selectedBreed, selectedSubBreed);

  const memoizedItems = useMemo(() => {
    if (!dogImages) return [];
    return dogImages.imageUrls.map((url, index) => ({
      id: `${index}-${url}`,
      url,
    }));
  }, [dogImages]);

  if (!selectedBreed && !selectedSubBreed) {
    return <div className="text-center py-4">Please select a breed to see images</div>;
  }

  if (isLoading) {
    return <div className="text-center py-4">Loading images...</div>;
  }

  if (!dogImages || dogImages.imageUrls.length === 0) {
    return <div className="text-center py-4">No images available</div>;
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

  return <Masonry items={memoizedItems} render={renderDogImage} columnGutter={16} columnWidth={250} overscanBy={5} />;
};
