import client from '../client';

interface LoginRequest {
  name: string;
  email: string;
}

export const login = async (body: LoginRequest) => {
  try {
    const response = await client.post('/auth/login', body);
    return response;
  } catch (error) {
    console.error('failed to log in', error);
    throw error;
  }
};
