import React, { useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { Dog } from '../api/dogs/types';


interface DogCardProps {
  dog: Dog;
  onFavoriteToggle: (id: string, isFavorite: boolean) => void;
}

const DogCard: React.FC<DogCardProps> = ({ dog, onFavoriteToggle }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavoriteClick = () => {
    const newFavoriteStatus = !isFavorite;
    setIsFavorite(newFavoriteStatus);
    onFavoriteToggle(dog.id, newFavoriteStatus);
  };

  return (
    <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white hover:shadow-2xl transition-shadow duration-300">
      <img className="w-full h-64 object-cover" src={dog.img} alt={dog.name} />

      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-800">{dog.name}</h2>
        <p className="text-sm text-gray-600">Age: {dog.age} years</p>
        <p className="text-sm text-gray-600">Breed: {dog.breed}</p>
        <p className="text-sm text-gray-600">Zip Code: {dog.zip_code}</p>
        
        <button
          onClick={handleFavoriteClick}
          className="mt-4 px-4 py-2 bg-red-500 text-white text-sm font-semibold rounded-md hover:bg-red-600 transition-colors duration-300 flex items-center space-x-2"
        >
          <span>{isFavorite ? 'Unfavorite' : 'Favorite'}</span>
          {isFavorite ? (
            <FaHeart className="text-white" />
          ) : (
            <FaRegHeart className="text-white" />
          )}
        </button>
      </div>
    </div>
  );
};

export default DogCard;
