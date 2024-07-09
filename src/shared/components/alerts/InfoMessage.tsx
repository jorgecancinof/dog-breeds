import React from 'react';
import { InformationCircleIcon } from '@heroicons/react/20/solid';

interface InfoMessageProps {
  title: React.ReactNode;
  message: React.ReactNode;
}

export const InfoMessage = ({ title, message }: InfoMessageProps) => (
  <div
    className="w-full max-w-[40rem] mx-auto flex flex-col items-center justify-center p-4 bg-blue-100 border border-blue-400 text-blue-700 rounded"
    role="status"
    aria-live="polite"
  >
    <InformationCircleIcon className="h-12 w-12 text-blue-700 mb-2" aria-hidden="true" />
    <h2 className="flex items-center gap-2 text-xl text-center font-bold mb-2">{title}</h2>
    <p>{message}</p>
  </div>
);
