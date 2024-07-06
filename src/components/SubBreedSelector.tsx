import React, { useState } from 'react';
import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions, Label } from '@headlessui/react';
import { CheckIcon, XMarkIcon } from '@heroicons/react/20/solid';
import { useSubBreeds } from '@/hooks/useSubBreeds';

interface SubBreedSelectorProps {
  selectedBreed: string | null;
  selectedSubBreed: string | null;
  onSubBreedSelect: (subBreed: string | null) => void;
}

export const SubBreedSelector = ({ selectedBreed, selectedSubBreed, onSubBreedSelect }: SubBreedSelectorProps) => {
  const { data: subBreeds, isLoading } = useSubBreeds(selectedBreed);
  const [query, setQuery] = useState('');

  const filteredSubBreeds =
    query === ''
      ? subBreeds
      : subBreeds?.filter((subBreed) => {
          return subBreed.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <Combobox as="div" immediate value={selectedSubBreed} onChange={onSubBreedSelect}>
      <Label className="block text-sm font-medium leading-6 text-gray-900">Sub-breed</Label>
      <div className="relative">
        <ComboboxInput
          className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          onChange={(event) => setQuery(event.target.value)}
          onBlur={() => setQuery('')}
          displayValue={(subBreed: string | null) => subBreed || ''}
          placeholder="Select a sub-breed"
          disabled={!selectedBreed}
          data-testid="subbreed-input"
        />
        {selectedSubBreed && (
          <ComboboxButton
            className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none"
            onClick={() => onSubBreedSelect(null)}
            data-testid="subbreed-clear-button"
          >
            <XMarkIcon className="h-5 w-5 text-gray-400 hover:text-gray-500 transition-colors" aria-hidden="true" />
          </ComboboxButton>
        )}

        <ComboboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
          {isLoading ? (
            <div className="relative cursor-default select-none py-2 px-4 text-gray-700">Loading...</div>
          ) : filteredSubBreeds?.length === 0 ? (
            <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
              {query !== '' ? 'Nothing found' : 'No sub-breeds available'}
            </div>
          ) : (
            filteredSubBreeds?.map((subBreed) => (
              <ComboboxOption
                key={subBreed}
                value={subBreed}
                className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-indigo-600 data-[focus]:text-white"
              >
                <span
                  data-testid={`subbreed-option-${subBreed}`}
                  className="block truncate group-data-[selected]:font-semibold capitalize"
                >
                  {subBreed}
                </span>

                <span className="absolute inset-y-0 right-0 hidden items-center pr-4 text-indigo-600 group-data-[selected]:flex group-data-[focus]:text-white">
                  <CheckIcon className="h-5 w-5" aria-hidden="true" />
                </span>
              </ComboboxOption>
            ))
          )}
        </ComboboxOptions>
      </div>
    </Combobox>
  );
};
