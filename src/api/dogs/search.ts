import client from '../client';
import { DogSearchResponse } from './types';

const searchDogs = async ({
  url,
  ...params
}: any): Promise<DogSearchResponse> => {
  try {
    const request = url
      ? client.get(url)
      : client.get('/dogs/search', { params });

    const response = await request;

    return {
      resultIds: response.data.resultIds,
      total: response.data.total,
      next: response.data.next,
      prev: response.data.prev,
    };
  } catch (error) {
    console.error('Error fetching dogs:', error);
    throw error;
  }
};

export default searchDogs;
