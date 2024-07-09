import React from 'react';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';

export const NoFavoritesMessage = () => (
  <div
    className="w-full max-w-[40rem] mx-auto flex flex-col items-center justify-center p-4 bg-pink-100 border border-pink-400 text-pink-700 rounded"
    role="status"
    aria-live="polite"
  >
    <HeartIconSolid className="h-12 w-12 text-pink-700 mb-2" aria-hidden="true" />
    <h2 className="flex items-center gap-2 text-xl text-center font-bold mb-2">No favorites yet</h2>
    <p>Mark images as favorites to see them here.</p>
  </div>
);
