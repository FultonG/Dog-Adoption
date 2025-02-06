import React, { useState } from 'react';
import { logout } from '../api/auth/logout';
import { Link, NavLink, useNavigate } from 'react-router';
import { FaDog } from 'react-icons/fa';
import { useFavorites } from '../context/favorites';
import Button from './Button';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { favorites } = useFavorites();
  const navigation = useNavigate();
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogOut = async () => {
    try {
      await logout();
      navigation('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const navStyles = ({ isActive }: { isActive: boolean }) =>
    `${isActive ? 'text-purple-600' : 'text-black hover:text-purple-600'}`;

  return (
    <nav className="bg-white shadow-md fixed w-full z-10">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-gray-800">
              Fetch: Buddy Finder
            </Link>
          </div>
          <div className="hidden md:flex space-x-8 items-center">
            <NavLink
              to="/"
              className={({ isActive }) => navStyles({ isActive })}
            >
              Home
            </NavLink>
            <NavLink
              to="/match"
              className={({ isActive }) => navStyles({ isActive })}
            >
              Match
            </NavLink>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden sm:block">
              <Button onClick={() => navigation('/match')}>
                Dogs: {favorites.length} <FaDog />
              </Button>
            </div>
            <div className="hidden sm:block">
              <Button variant="outlined" onClick={handleLogOut}>
                Logout
              </Button>
            </div>

            {/* Hamburger Menu for Mobile */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="text-gray-700 hover:text-blue-600 focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <>
            <div className="md:hidden bg-gray-100 p-4 text-center">
              <NavLink to="Match">Match</NavLink>
            </div>
            <div className="md:hidden bg-gray-100 p-4 text-center">
              <Button onClick={handleLogOut} variant="outlined">
                Logout
              </Button>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
