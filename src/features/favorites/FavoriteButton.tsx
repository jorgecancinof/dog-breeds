import React from 'react';
import { HeartIcon as HeartIconOutline } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';

interface FavoriteButtonProps {
  isChecked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
}

export const FavoriteButton = ({ isChecked, onChange, label }: FavoriteButtonProps) => {
  return (
    <label className="flex items-center cursor-pointer">
      <div className="relative">
        <input type="checkbox" className="sr-only" checked={isChecked} onChange={(e) => onChange(e.target.checked)} />
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-200 ease-in-out ${isChecked ? 'bg-red-500' : 'bg-white border border-gray-300'}`}
        >
          {isChecked ? (
            <HeartIconSolid className="h-6 w-6 text-white" />
          ) : (
            <HeartIconOutline className="h-6 w-6 text-gray-400" />
          )}
        </div>
      </div>
      {label && <span className="ml-3 text-sm font-medium text-gray-900">{label}</span>}
    </label>
  );
};
