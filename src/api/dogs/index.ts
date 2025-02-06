import client from '../client';
import { Dog } from './types';

/**
 * Fetch a list of dog objects by their IDs.
 *
 * @param {string[]} dogIds - An array of dog IDs to fetch (max 100 IDs).
 * @returns {Promise<Dog[]>} - Returns a promise that resolves to an array of dog objects.
 */
export async function fetchDogsByIds(dogIds: string[]): Promise<Dog[]> {
  if (!Array.isArray(dogIds) || dogIds.length === 0 || dogIds.length > 100) {
    throw new Error('Dog IDs must be an array of up to 100 IDs.');
  }

  try {
    const response = await client.post('/dogs', dogIds);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch dogs:', error);
    throw error;
  }
}
