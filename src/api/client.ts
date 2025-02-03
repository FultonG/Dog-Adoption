import axios, { AxiosResponse, AxiosError } from 'axios';

// Create an axios instance
const api = axios.create({
  baseURL: 'https://frontend-take-home-service.fetch.com',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,  // Make sure cookies are sent in cross-origin requests
});

// Response Interceptor: Handle 401 Unauthorized errors (for expired session or invalid cookies)
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    // Check if the error status is 401 (unauthorized), meaning the session might be expired
    if (error.response && error.response.status === 401) {
      console.error('Session expired or unauthorized');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
