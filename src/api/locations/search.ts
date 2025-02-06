import client from '../client';

interface Location {
  zip_code: string;
  latitude: number;
  longitude: number;
  city: string;
  state: string;
  county: string;
}

interface LocationSearchResponse {
  results: Location[];
  total: number;
}

const searchLocationsByState = async (
  states: string[]
): Promise<LocationSearchResponse> => {
  try {
    const response = await client.post('/locations/search', { states });

    return response.data;
  } catch (error) {
    console.error('Error fetching dogs:', error);
    throw error;
  }
};

export default searchLocationsByState;
