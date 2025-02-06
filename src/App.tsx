import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import LoginModal from './pages/LoginModal';
import Navbar from './components/Navbar';
import DogSearchPage from './pages/DogSearch';
import Match from './pages/Match';
import { FavoritesProvider } from './context/favorites';
const App: React.FC = () => {
  return (
    <BrowserRouter>
      <FavoritesProvider>
        <div className="min-h-screen bg-white flex">
          <Navbar />
          <div className="pt-20 w-full min-h-screen max-w-screen-xl mx-auto p-4">
            <Routes>
              <Route path="/" element={<DogSearchPage />} />
              <Route path="/login" element={<LoginModal />} />
              <Route path="/match" element={<Match />} />
            </Routes>
          </div>
        </div>
      </FavoritesProvider>
    </BrowserRouter>
  );
};

export default App;
