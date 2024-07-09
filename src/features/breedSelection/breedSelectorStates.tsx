import React from 'react';
import { XCircleIcon, InformationCircleIcon } from '@heroicons/react/20/solid';
import { SpinnerIcon } from '@/shared/components/icons/SpinnerIcon';

export const LoadingState = ({ message }: { message: string }) => (
  <div className="flex items-center gap-2 relative cursor-default select-none py-2 px-4 text-pink-400">
    <SpinnerIcon className="w-5 h-5" />
    {message}
  </div>
);

export const ErrorState = ({ message }: { message: string }) => (
  <div className="flex items-center gap-1.5 relative cursor-default select-none py-2 px-4 text-pink-400">
    <XCircleIcon className="h-5 w-5 text-pink-400" aria-hidden="true" />
    {message}
  </div>
);

export const InfoState = ({ message }: { message: string }) => (
  <div className="flex items-center gap-1.5 relative cursor-default select-none py-2 px-4 text-pink-400">
    <InformationCircleIcon className="h-5 w-5 text-pink-400" aria-hidden="true" />
    {message}
  </div>
);
