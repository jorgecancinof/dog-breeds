import React, { useState } from 'react';
import { useSubBreeds } from './useSubBreeds';
import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions, Label } from '@headlessui/react';
import { CheckIcon, XMarkIcon } from '@heroicons/react/20/solid';
import { LoadingState, ErrorState, InfoState } from './breedSelectorStates';

interface SubBreedSelectorProps {
  selectedBreed: string | null;
  selectedSubBreed: string | null;
  onSubBreedSelect: (subBreed: string | null) => void;
}

export const SubBreedSelector = ({ selectedBreed, selectedSubBreed, onSubBreedSelect }: SubBreedSelectorProps) => {
  const { data: subBreeds, isLoading, isError } = useSubBreeds(selectedBreed);
  const [query, setQuery] = useState('');

  const filteredSubBreeds =
    query === ''
      ? subBreeds
      : subBreeds?.filter((subBreed) => {
          return subBreed.toLowerCase().includes(query.toLowerCase());
        });

  const isEmptyQuery = query === '';
  const noFilteredResults = filteredSubBreeds?.length === 0;
  const noSubBreedsAvailable = isEmptyQuery && noFilteredResults;
  const nothingFound = !isEmptyQuery && noFilteredResults;

  const ComboboxStatus = (() => {
    switch (true) {
      case isLoading:
        return <LoadingState message="Loading sub-breeds" />;
      case isError:
        return <ErrorState message="Error loading sub-breeds" />;
      case noSubBreedsAvailable:
        return <InfoState message="No sub-breeds available" />;
      case !selectedBreed:
        return <InfoState message="Select a breed first" />;
      default:
        return null;
    }
  })();
  const isRenderingStatus = Boolean(ComboboxStatus);

  return (
    <Combobox as="div" immediate value={selectedSubBreed} onChange={onSubBreedSelect} className="w-full">
      <Label className="block text-base font-medium leading-6 text-pink-900">Sub-breed</Label>
      <div className="relative">
        <ComboboxInput
          className="w-full rounded-md border-0 bg-white py-2.5 pl-4 pr-10 text-pink-900 shadow-sm ring-1 ring-inset ring-pink-300 focus:ring-2 focus:ring-inset focus:ring-pink-600 text-base sm:leading-7 placeholder:text-pink-400"
          onChange={(event) => setQuery(event.target.value)}
          onBlur={() => setQuery('')}
          displayValue={(subBreed: string | null) => subBreed || ''}
          placeholder={!isRenderingStatus ? 'Select a sub-breed' : ''}
          disabled={!selectedBreed || isLoading || isError || noSubBreedsAvailable}
          maxLength={20}
          spellCheck={false}
          data-testid="subbreed-input"
        />
        {isRenderingStatus && <div className="absolute inset-y-0 left-0 flex items-center">{ComboboxStatus}</div>}
        {selectedSubBreed && (
          <ComboboxButton
            className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-3 focus:outline-none text-pink-400 hover:text-pink-500 transition-colors"
            onClick={() => onSubBreedSelect(null)}
            title="Clear sub-breed"
            aria-label="Clear sub-breed"
            data-testid="subbreed-clear-button"
          >
            <XMarkIcon className="h-5 w-5" aria-hidden="true" />
          </ComboboxButton>
        )}

        <ComboboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
          {nothingFound ? (
            <div className="flex gap-2 relative cursor-default select-none py-2 px-4 text-pink-900">Nothing found</div>
          ) : (
            filteredSubBreeds?.map((subBreed) => (
              <ComboboxOption
                key={subBreed}
                value={subBreed}
                className="group relative cursor-default select-none py-2 pl-3 pr-9 text-pink-900 data-[focus]:bg-pink-600 data-[focus]:text-white"
              >
                <span
                  data-testid={`subbreed-option-${subBreed}`}
                  className="block truncate group-data-[selected]:font-semibold capitalize"
                >
                  {subBreed}
                </span>

                <span className="absolute inset-y-0 right-0 hidden items-center pr-4 text-pink-600 group-data-[selected]:flex group-data-[focus]:text-white">
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
