import React from 'react';
import { HeartIcon as HeartIconOutline } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';

interface FavoriteButtonProps {
  isChecked: boolean;
  onChange: (checked: boolean) => void;
}

export const FavoriteButton = ({ isChecked, onChange }: FavoriteButtonProps) => {
  const label = isChecked ? 'Remove from favorites' : 'Add to favorites';

  return (
    <label className="flex items-center cursor-pointer" aria-label={label} title={label} data-testid="favorite-button">
      <div className="relative">
        <input type="checkbox" className="sr-only" checked={isChecked} onChange={(e) => onChange(e.target.checked)} />
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-200 ease-in-out ${isChecked ? 'bg-pink-500' : 'bg-transparent border border-white'}`}
        >
          {isChecked ? (
            <HeartIconSolid className="h-6 w-6 text-white" />
          ) : (
            <HeartIconOutline className="h-6 w-6 text-white" />
          )}
        </div>
      </div>
    </label>
  );
};
