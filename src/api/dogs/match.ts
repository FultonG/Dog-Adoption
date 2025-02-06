import { fetchDogsByIds } from '.';
import client from '../client';
import { Dog } from './types';
interface Match {
  match: string;
}
export const match = async (dogs: string[]): Promise<Match> => {
  try {
    const response = await client.post('/dogs/match', dogs);

    return response.data;
  } catch (error) {
    console.error('Error match with a dog:', error);
    throw error;
  }
};

export const matchedDog = async (dogs: string[]): Promise<Dog> => {
  try {
    const matched = await match(dogs);
    const matchedDogDetails = await fetchDogsByIds([matched.match]);
    if (matchedDogDetails.length === 1) {
      return matchedDogDetails[0];
    } else {
      throw Error('API Response was not an array with a single record');
    }
  } catch (error) {
    console.error('Error match with a dog:', error);
    throw error;
  }
};

export default matchedDog;
