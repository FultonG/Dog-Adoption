import React from 'react';
import SearchBox from './Searchbox';

interface DogFiltersProps {
  breeds: string[];
  zipCodes: string[];
  ageMin: number | undefined;
  ageMax: number | undefined;
  onFilterChange: (filters: {
    breeds: string[];
    zipCodes: string[];
    ageMin: number | undefined;
    ageMax: number | undefined;
  }) => void;
}

const DogFilters: React.FC<DogFiltersProps> = ({
  breeds,
  zipCodes,
  ageMin,
  ageMax,
  onFilterChange,
}) => {
  const handleBreedChange = (selectedBreeds: string[]) => {
    onFilterChange({ breeds: selectedBreeds, zipCodes, ageMin, ageMax });
  };

  const handleZipCodeChange = (selectedZipCodes: string[]) => {
    onFilterChange({ breeds, zipCodes: selectedZipCodes, ageMin, ageMax });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Filter Results</h2>

      <SearchBox
        label="Breeds"
        options={breeds}
        selectedOptions={[]}
        onSelectChange={handleBreedChange}
      />

      <SearchBox
        label="Zip Codes"
        options={zipCodes}
        selectedOptions={[]}
        onSelectChange={handleZipCodeChange}
      />

      <div className="mb-4 flex justify-between">
        <div className="w-1/2 pr-2">
          <label htmlFor="ageMin" className="block text-gray-700 font-medium mb-2">
            Min Age
          </label>
          <input
            id="ageMin"
            type="number"
            min="0"
            value={ageMin || ''}
            onChange={(e) => onFilterChange({ breeds, zipCodes, ageMin: Number(e.target.value), ageMax })}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div className="w-1/2 pl-2">
          <label htmlFor="ageMax" className="block text-gray-700 font-medium mb-2">
            Max Age
          </label>
          <input
            id="ageMax"
            type="number"
            min="0"
            value={ageMax || ''}
            onChange={(e) => onFilterChange({ breeds, zipCodes, ageMin, ageMax: Number(e.target.value) })}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default DogFilters;
