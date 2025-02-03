import React, { useState, useEffect } from 'react';
import searchDogs from '../api/dogs/search';
import usePagination from '../hooks/usePagination';
import { useGetDogs } from '../hooks/useGetDogs';
import DogCard from '../components/DogCard';
import Pagination from '../components/Pagination';

const DogSearchPage: React.FC = () => {

  const [breeds, setBreeds] = useState<string[]>([]);
  const [zipCodes, setZipCodes] = useState<string[]>([]);
  const [ageMin, setAgeMin] = useState<number | undefined>(undefined);
  const [ageMax, setAgeMax] = useState<number | undefined>(undefined);
  const [size, setSize] = useState<number>(25); // Default results per page
  const [sort, setSort] = useState<string>('breed:asc'); // Default sorting by breed

  // Construct search parameters based on filter state
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

  useEffect(() => {
    setParams(searchParams);
  }, [searchParams, setParams]);

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Search for Dogs</h1>

      <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
        {/* Add filter inputs here */}
      </div>

      {loading && <div className="text-center text-gray-700">Loading...</div>}
      {error && <div className="text-center text-red-500">{error}</div>}

      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Results: {paginationState.total} Dogs Found
        </h2>

        {dogs && dogs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {dogs.map((dog) => (
              <DogCard key={dog.id} dog={dog} onFavoriteToggle={() => {}} />
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
  );
};


export default DogSearchPage;
