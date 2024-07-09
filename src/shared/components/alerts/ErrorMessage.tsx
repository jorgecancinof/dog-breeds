import React from 'react';
import { XCircleIcon } from '@heroicons/react/20/solid';

interface ErrorMessageProps {
  title: React.ReactNode;
  message: React.ReactNode;
}

export const ErrorMessage = ({ title, message }: ErrorMessageProps) => (
  <div
    className="w-full max-w-[40rem] mx-auto flex flex-col items-center justify-center p-4 bg-red-100 border border-red-400 text-red-700 rounded"
    role="alert"
    aria-live="assertive"
  >
    <XCircleIcon className="h-12 w-12 text-red-700 mb-2" aria-hidden="true" />
    <h2 className="flex items-center gap-2 text-xl text-center font-bold mb-2">{title}</h2>
    <p>{message}</p>
  </div>
);
