import React from 'react';
import { ExclamationCircleIcon } from '@heroicons/react/20/solid';

interface ErrorMessageProps {
  title: React.ReactNode;
  message: React.ReactNode;
}

export const ErrorMessage = ({ title, message }: ErrorMessageProps) => (
  <div
    className="flex flex-col items-center justify-center p-4 bg-red-100 border border-red-400 text-red-700 rounded"
    role="alert"
    aria-live="assertive"
  >
    <ExclamationCircleIcon className="h-20 w-20 text-red-700 mb-2" aria-hidden="true" />
    <h2 className="flex items-center gap-2 text-xl text-center font-bold mb-2">{title}</h2>
    <p className="max-w-[30rem]">{message}</p>
  </div>
);
