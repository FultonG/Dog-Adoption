import React, { useState, useEffect, useCallback } from 'react';
import Spinner from './Spinner';
import Button from './Button';

interface SearchBoxProps {
  label: string;
  options: string[];
  selectedOptions: string[];
  onSelectChange: (selected: string[]) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({
  label,
  options,
  selectedOptions,
  onSelectChange,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [localSelectedOptions, setLocalSelectedOptions] =
    useState<string[]>(selectedOptions);
  const [filteredOptions, setFilteredOptions] = useState<string[]>(options);
  const [loading, setLoading] = useState(false);

  // Debounced search input handler
  const debounceSearch = useCallback(
    (term: string) => {
      setLoading(true);
      const timeoutId = setTimeout(() => {
        const filtered = options.filter((option) =>
          option.toLowerCase().includes(term.toLowerCase())
        );
        setFilteredOptions(filtered);
        setLoading(false);
      }, 300); // 300ms debounce time
      return () => clearTimeout(timeoutId);
    },
    [options]
  );

  useEffect(() => {
    if (searchTerm) {
      debounceSearch(searchTerm);
    } else {
      setFilteredOptions(options);
    }
  }, [searchTerm, debounceSearch, options]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (e.target.checked) {
      setLocalSelectedOptions((prev) => [...prev, value]);
    } else {
      setLocalSelectedOptions((prev) =>
        prev.filter((option) => option !== value)
      );
    }
  };

  const handleApplyChanges = () => {
    onSelectChange(localSelectedOptions);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
  };

  const handleClearFilter = () => {
    setSearchTerm('');
    setLocalSelectedOptions([]);
    setFilteredOptions(options);
    onSelectChange([]);
  };

  const sortedOptions = filteredOptions.sort((a, b) => {
    const aSelected = localSelectedOptions.includes(a);
    const bSelected = localSelectedOptions.includes(b);

    if (aSelected && !bSelected) return -1;
    if (!aSelected && bSelected) return 1;
    return 0;
  });

  return (
    <div className="mb-4">
      <label className="block text-gray-700 font-medium mb-2">{label}</label>

      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder={`Search for ${label.toLowerCase()}`}
          className="w-full p-2 border border-gray-300 rounded-lg mb-4"
        />

        {searchTerm && (
          <button
            onClick={handleClearSearch}
            className="absolute right-3 top-2 text-gray-500 hover:text-gray-700"
          >
            &times;
          </button>
        )}
      </div>

      {loading && (
        <div className="flex justify-center mb-4">
          <Spinner />
        </div>
      )}

      {!loading && (
        <div className="space-y-2 max-h-40 overflow-y-auto">
          {sortedOptions.map((option) => (
            <div key={option} className="flex items-center">
              <input
                type="checkbox"
                id={option}
                value={option}
                checked={localSelectedOptions.includes(option)}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              <label htmlFor={option} className="text-gray-700">
                {option}
              </label>
            </div>
          ))}
        </div>
      )}

      <div className="mt-4 flex justify-between">
        <Button onClick={handleClearFilter} variant="outlined">
          Clear Filter
        </Button>

        <Button onClick={handleApplyChanges}>Apply</Button>
      </div>
    </div>
  );
};

export default SearchBox;
