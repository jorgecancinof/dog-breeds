import React from 'react';
import { SpinnerIcon } from '@/shared/components/icons/SpinnerIcon';
import { PawIcon } from '@/shared/components/icons/PawIcon';

export const Loading = () => {
  return (
    <div className="flex justify-center py-4">
      <div role="status" aria-live="polite" className="relative">
        <SpinnerIcon className="w-36 h-36 text-pink-500" />
        <PawIcon className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-20 w-20 text-pink-500" />
        <span className="sr-only">Loading</span>
      </div>
    </div>
  );
};
