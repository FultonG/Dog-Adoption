import client from '../client';

const getBreeds = async () => {
  try {
    const response = await client.get('/dogs/breeds');

    return response.data;
  } catch (error) {
    console.error('Error fetching breeds:', error);
    throw error;
  }
};

export default getBreeds;
