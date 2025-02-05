import { useState, useEffect, useRef } from 'react';
import { fetchDogsByIds } from '../api/dogs';
import { Dog } from '../api/dogs/types';

// Custom hook to fetch dogs with caching
function useGetDogs(dogIds: string[]) {
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const dogCache = useRef(new Map<string, Dog>()); // Using useRef to persist cache across renders

  useEffect(() => {
    // A function to load dogs that are not in cache yet
    const loadDogs = async () => {
      setLoading(true);
      setError(null);

      // Find the dog IDs that are not in cache
      const idsToFetch = dogIds.filter(id => !dogCache.current.has(id));

      if (idsToFetch.length === 0) {
        // If all dogs are in the cache, no need to make API calls
        setDogs(dogIds.map(id => dogCache.current.get(id)!));
        setLoading(false);
        return;
      }

      try {
        // Fetch dogs that are not in the cache
        const fetchedDogs = await fetchDogsByIds(idsToFetch);

        // Update the cache with the fetched dogs
        fetchedDogs.forEach(dog => dogCache.current.set(dog.id, dog));

        // Update the state with the complete dog list
        const allDogs = dogIds.map(id => dogCache.current.get(id)!);
        setDogs(allDogs);
      } catch (error) {
        setError('Failed to fetch dogs');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadDogs();
  }, [dogIds]);

  return { dogs, loading, error };
}

export default useGetDogs;
