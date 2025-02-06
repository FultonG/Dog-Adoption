import React, { useState, useEffect } from 'react';
import DogFilters from '../components/DogFilters';
import getBreeds from '../api/dogs/breeds';
import useGetDogs from '../hooks/useGetDogs';
import usePagination from '../hooks/usePagination';
import DogCard from '../components/DogCard';
import searchDogs from '../api/dogs/search';
import Pagination from '../components/Pagination';
import DogCardSkeleton from '../components/DogCardSkeleton';

const DogSearchPage: React.FC = () => {
  const [breeds, setBreeds] = useState<string[]>([]);
  const [zipCodes, setZipCodes] = useState<string[]>([]);
  const [ageMin, setAgeMin] = useState<number | undefined>(undefined);
  const [ageMax, setAgeMax] = useState<number | undefined>(undefined);
  const [sort, setSort] = useState<string>('breed:asc');
  const [breedList, setBreedList] = useState<string[]>([]);
  const size = 25;

  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        const response = await getBreeds();
        setBreedList(response);
      } catch (error) {
        console.error('Error fetching breeds:', error);
      }
    };

    fetchBreeds();
  }, []);

  const searchParams = {
    breeds,
    zipCodes,
    ageMin,
    ageMax,
    size,
    sort,
  };

  const {
    paginationState,
    currentPage,
    fetchNextPage,
    fetchPrevPage,
    setParams,
  } = usePagination<string>(searchDogs, searchParams);

  const { dogs, loading, error } = useGetDogs(paginationState.data);

  const handleFilterChange = (filters: {
    breeds: string[];
    zipCodes: string[];
    ageMin: number | undefined;
    ageMax: number | undefined;
    sort: string;
  }) => {
    setBreeds(filters.breeds);
    setZipCodes(filters.zipCodes);
    setAgeMin(filters.ageMin);
    setAgeMax(filters.ageMax);
    setSort(filters.sort);
    setParams({ ...filters, size });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
        Search for Dogs
      </h1>
      {error && <div className="text-center text-red-500">{error}</div>}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="w-full lg:w-1/4">
          <DogFilters
            breeds={breedList}
            zipCodes={zipCodes}
            ageMin={ageMin}
            ageMax={ageMax}
            sort={sort}
            onFilterChange={handleFilterChange}
          />
        </div>

        <div className="w-full lg:w-3/4">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array(6)
                .fill(0)
                .map((_, index) => (
                  <DogCardSkeleton key={index} />
                ))}
            </div>
          ) : dogs && dogs.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {dogs.map((dog) => (
                <DogCard key={dog.id} dog={dog} />
              ))}
            </div>
          ) : (
            <div>No results found.</div>
          )}

          <Pagination
            paginationState={paginationState}
            currentPage={currentPage}
            fetchPrevPage={fetchPrevPage}
            fetchNextPage={fetchNextPage}
          />
        </div>
      </div>
    </div>
  );
};

export default DogSearchPage;
