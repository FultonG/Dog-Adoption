import React, { useState } from 'react';
import {login} from '../api/auth/login';
import Spinner from '../components/Spinner';
import { useNavigate } from 'react-router';

const LoginModal = () => {
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try{
      const response = await login({email, name: userName})
      if (response) {
        navigate('/');
      } else {
        setError('Invalid credentials, please try again.');
      }
    } catch (error: any) {
      // Catch the error and handle it
      if (error.response) {
        setError(error.response.data.message || 'Something went wrong. Please try again.');
      } else if (error.request) {
        setError('Network error. Please check your internet connection.');
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full sm:w-96 p-6 shadow-xl transition-all transform scale-100 opacity-100 fade-in">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label htmlFor="userName" className="block text-sm font-medium text-gray-600">Name</label>
            <input
              type="userName"
              id="userName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your name"
            />
          </div>
        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
          <div className="flex justify-between items-center">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {loading ? <Spinner /> : 'Login'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
