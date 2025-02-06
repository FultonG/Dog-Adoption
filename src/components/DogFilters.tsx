import React, { useState } from 'react';
import SearchBox from './Searchbox';
import { STATES_AND_TERRITORIES } from '../constants';
import searchLocationsByState from '../api/locations/search';
import { TiArrowSortedDown } from 'react-icons/ti';
import { TiArrowSortedUp } from 'react-icons/ti';
import Button from './Button';
interface DogFiltersProps {
  breeds: string[];
  zipCodes: string[];
  ageMin: number | undefined;
  ageMax: number | undefined;
  sort: string;
  onFilterChange: (filters: {
    breeds: string[];
    zipCodes: string[];
    ageMin: number | undefined;
    ageMax: number | undefined;
    sort: string;
  }) => void;
}

const DogFilters: React.FC<DogFiltersProps> = ({
  breeds,
  ageMin,
  ageMax,
  sort,
  onFilterChange,
}) => {
  const [selectedBreeds, setSelectedBreeds] = useState<string[]>([]);
  const [selectedZipCodes, setSelectedZipCodes] = useState<string[]>([]);

  const handleBreedChange = (changedBreeds: string[]) => {
    setSelectedBreeds(changedBreeds);
    onFilterChange({
      breeds: changedBreeds,
      zipCodes: selectedZipCodes,
      ageMin,
      ageMax,
      sort,
    });
  };

  const handleStateAndTerritoriesChange = async (states: string[]) => {
    const locations = await searchLocationsByState(states);
    let changedZipCodes = locations.results.reduce((acc, curr) => {
      acc.push(curr.zip_code);
      return acc;
    }, [] as string[]);
    setSelectedZipCodes(changedZipCodes);
    onFilterChange({
      breeds: selectedBreeds,
      zipCodes: changedZipCodes,
      ageMin,
      ageMax,
      sort,
    });
  };

  const handleNumberInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    label: string
  ) => {
    const age = parseInt(e.target.value, 10);
    if (!isNaN(age) && age >= 0) {
      if (label === 'min') {
        onFilterChange({
          breeds: selectedBreeds,
          zipCodes: selectedZipCodes,
          ageMin: age,
          ageMax,
          sort,
        });
      } else {
        onFilterChange({
          breeds: selectedBreeds,
          zipCodes: selectedZipCodes,
          ageMin,
          ageMax: age,
          sort,
        });
      }
    }
  };

  const handleClearAgeFilter = () => {
    onFilterChange({
      breeds: selectedBreeds,
      zipCodes: selectedZipCodes,
      ageMin: undefined,
      ageMax: undefined,
      sort,
    });
  };

  const toggleSort = () => {
    let selectedSort = sort === 'breed:asc' ? 'breed:desc' : 'breed:asc';
    console.log(selectedSort);
    onFilterChange({
      breeds: selectedBreeds,
      zipCodes: selectedZipCodes,
      ageMin: undefined,
      ageMax: undefined,
      sort: selectedSort,
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Filter Results</h2>
      <div className="mb-4">
        <Button onClick={toggleSort}>
          {sort === 'breed:asc' ? (
            <div className="flex items-center space-x-2">
              <span>Sort: Ascending</span>
              <TiArrowSortedUp />
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <span>Sort: Descending</span>
              <TiArrowSortedDown />
            </div>
          )}
        </Button>
      </div>

      <SearchBox
        label="Breeds"
        options={breeds}
        selectedOptions={selectedBreeds}
        onSelectChange={handleBreedChange}
      />

      <SearchBox
        label="Location"
        options={STATES_AND_TERRITORIES}
        selectedOptions={[]}
        onSelectChange={handleStateAndTerritoriesChange}
      />

      <div className="mb-4 flex justify-between">
        <div className="w-1/2 pr-2">
          <label
            htmlFor="ageMin"
            className="block text-gray-700 font-medium mb-2"
          >
            Min Age
          </label>
          <input
            id="ageMin"
            type="number"
            min="0"
            value={ageMin ?? ''}
            onChange={(e) => handleNumberInputChange(e, 'min')}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div className="w-1/2 pl-2">
          <label
            htmlFor="ageMax"
            className="block text-gray-700 font-medium mb-2"
          >
            Max Age
          </label>
          <input
            id="ageMax"
            type="number"
            min="0"
            value={ageMax ?? ''}
            onChange={(e) => handleNumberInputChange(e, 'max')}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
      </div>
      <Button variant="outlined" onClick={handleClearAgeFilter}>
        Clear Filter
      </Button>
    </div>
  );
};

export default DogFilters;
