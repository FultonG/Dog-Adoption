import React from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { Dog } from '../api/dogs/types';
import { useFavorites } from '../context/favorites';
import Button from './Button';

interface DogCardProps {
  dog: Dog;
  match?: boolean;
}

const DogCard: React.FC<DogCardProps> = React.memo(({ dog, match }) => {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  const handleFavoriteClick = () => {
    if (isFavorite(dog.id)) {
      removeFavorite(dog.id);
    } else {
      addFavorite(dog.id);
    }
  };

  return (
    <div
      className={`${match ? 'w-full' : 'max-w-sm'} rounded-lg overflow-hidden shadow-lg bg-white hover:shadow-2xl transition-shadow duration-300`}
    >
      <img className="w-full h-64 object-cover" src={dog.img} alt={dog.name} />

      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-800">{dog.name}</h2>
        <p className="text-sm text-gray-600">Age: {dog.age} years</p>
        <p className="text-sm text-gray-600">Breed: {dog.breed}</p>
        <p className="text-sm text-gray-600">Zip Code: {dog.zip_code}</p>

        {!match ? (
          <Button
            onClick={handleFavoriteClick}
            variant={isFavorite(dog.id) ? 'filled' : 'outlined'}
            className="mt-4"
          >
            <span>{isFavorite(dog.id) ? 'Unfavorite' : 'Favorite'}</span>
            {isFavorite(dog.id) ? (
              <FaHeart className="text-white" />
            ) : (
              <FaRegHeart className="text-purple-500" />
            )}
          </Button>
        ) : null}
      </div>
    </div>
  );
});

export default DogCard;
