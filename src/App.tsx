import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router";
import LoginModal from './pages/LoginModal';
import Navbar from './components/Navbar';
import DogSearchPage from './pages/DogSearch';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white flex">
        <Navbar />
        <div className="pt-30 w-full min-h-screen max-w-screen-xl mx-auto p-4">
          <Routes>
            <Route path='/' element={<DogSearchPage />} />
            <Route path='/login' element={<LoginModal />} />
          </Routes>
        </div>

      </div>
    </BrowserRouter>
  );
};

export default App;
