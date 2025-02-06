import React, { useState } from 'react';
import useGetDogs from '../hooks/useGetDogs';
import DogCard from '../components/DogCard';
import Pagination from '../components/Pagination';
import { useFavorites } from '../context/favorites';
import useArrayPagination from '../hooks/useArrayPagination';
import DogCardSkeleton from '../components/DogCardSkeleton';
import Button from '../components/Button';
import match from '../api/dogs/match';
import Modal from '../components/Modal';
import { Dog } from '../api/dogs/types';

const DogSearchPage: React.FC = () => {
  const { favorites } = useFavorites();
  const [matchedDog, setMatchedDog] = useState<Dog>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => setIsModalOpen(false);
  const { paginationState, currentPage, fetchNextPage, fetchPrevPage } =
    useArrayPagination<string>(favorites);
  const { dogs, loading, error } = useGetDogs(paginationState.data);
  const handleMatch = async () => {
    const response = await match(favorites);
    setMatchedDog(response);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
        Match with a dog
      </h1>
      {dogs && dogs.length > 0 ? (
        <div className="p-4 flex lg:flex-row gap-4 justify-center items-center">
          <p>Once you've confirmed your favorites click the match button!</p>
          <Button onClick={handleMatch}>Match</Button>
        </div>
      ) : null}
      {error && <div className="text-center text-red-500">{error}</div>}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="w-full">
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
      <Modal title="Match found!" isOpen={isModalOpen} onClose={closeModal}>
        {matchedDog && <DogCard dog={matchedDog} match />}
      </Modal>
    </div>
  );
};

export default DogSearchPage;
