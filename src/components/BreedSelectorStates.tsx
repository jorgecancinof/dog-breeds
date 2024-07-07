import React from 'react';
import { ExclamationCircleIcon } from '@heroicons/react/20/solid';
import { SpinnerIcon } from './SpinnerIcon';

export const LoadingState = ({ message }: { message: string }) => (
  <div className="flex items-center gap-2 relative cursor-default select-none py-2 px-4 text-indigo-600">
    <SpinnerIcon className="w-5 h-5" />
    {message}
  </div>
);

export const ErrorState = ({ message }: { message: string }) => (
  <div className="flex gap-1.5 relative cursor-default select-none py-2 px-4 text-red-500">
    <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
    {message}
  </div>
);

export const NoResultsState = ({ message }: { message: string }) => (
  <div className="flex gap-2 relative cursor-default select-none py-2 px-4 text-gray-700">{message}</div>
);
