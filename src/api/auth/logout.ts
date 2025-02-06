import client from '../client';

export const logout = async () => {
  try {
    const response = await client.post('/auth/logout');
    return response;
  } catch (error) {
    console.error('failed to log out', error);
    throw error;
  }
};
