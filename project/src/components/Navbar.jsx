import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { FaShoppingCart } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import logo from '../assets/logo.png';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { user, logout } = useAuth();
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    clearCart();
    navigate('/');
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== '') {
      navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
      setSearchTerm('');
      if (isMenuOpen) setIsMenuOpen(false);
    }
  };

  const navLinks = (
    <>
      <Link
        to="/"
        onClick={() => setIsMenuOpen(false)}
        className="hover:text-amber-400 transition-colors duration-300"
      >
        Home
      </Link>
      <Link
        to="/story"
        onClick={() => setIsMenuOpen(false)}
        className="hover:text-amber-400 transition-colors duration-300"
      >
        Story
      </Link>
      <Link
        to="/news"
        onClick={() => setIsMenuOpen(false)}
        className="hover:text-amber-400 transition-colors duration-300"
      >
        News
      </Link>
      <Link
        to="/store"
        onClick={() => setIsMenuOpen(false)}
        className="hover:text-amber-400 transition-colors duration-300"
      >
        Store
      </Link>
      <Link
        to="/contact"
        onClick={() => setIsMenuOpen(false)}
        className="hover:text-amber-400 transition-colors duration-300"
      >
        Contact
      </Link>
      <Link
        to="/become-warrior"
        onClick={() => setIsMenuOpen(false)}
        className="hover:text-amber-400 transition-colors duration-300"
      >
        Become Warrior
      </Link>
      {user && user.role === 'admin' && (
        <Link
          to="/admin"
          onClick={() => setIsMenuOpen(false)}
          className="hover:text-amber-400 transition-colors duration-300"
        >
          Admin Panel
        </Link>
      )}
    </>
  );

  const authLinks = (
    <>
      {!user ? (
        <>
          <Link
            to="/login"
            onClick={() => setIsMenuOpen(false)}
            className="hover:text-amber-400 transition-colors duration-300"
          >
            Login
          </Link>
          <Link
            to="/signup"
            onClick={() => setIsMenuOpen(false)}
            className="hover:text-amber-400 transition-colors duration-300"
          >
            Signup
          </Link>
        </>
      ) : (
        <button
          onClick={() => {
            handleLogout();
            setIsMenuOpen(false);
          }}
          className="hover:text-amber-400 transition-colors duration-300"
        >
          Logout
        </button>
      )}
    </>
  );

  return (
    <nav className="bg-gradient-to-br from-gray-900 to-gray-800 text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          <div className="flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden mr-2 p-2 rounded-md hover:bg-gray-700 transition-colors duration-300"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <Link to="/" onClick={() => setIsMenuOpen(false)} className="flex items-center">
              <img
                src={logo}
                alt="Logo"
                className="h-20 transition-transform duration-300 hover:scale-110 drop-shadow-lg"
              />
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-6">{navLinks}</div>
          <div className="hidden md:flex items-center space-x-6">
            <form
              onSubmit={handleSearchSubmit}
              className="flex items-center border border-gray-700 rounded overflow-hidden"
            >
              <input
                type="text"
                placeholder="Search products & news..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-2 py-1 text-black outline-none"
              />
              <button
                type="submit"
                className="bg-amber-500 px-3 py-1 hover:bg-amber-600 transition-colors duration-300"
                aria-label="Search"
              >
                Search
              </button>
            </form>
            {cartItems.length > 0 && (
              <Link
                to="/cart"
                onClick={() => setIsMenuOpen(false)}
                className="relative hover:text-amber-400 transition-colors duration-300"
              >
                <FaShoppingCart className="text-2xl" />
                <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full px-1 text-xs">
                  {cartItems.length}
                </span>
              </Link>
            )}
            <div className="flex items-center space-x-4">{authLinks}</div>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-gradient-to-br from-gray-800 to-gray-900 px-4 pt-2 pb-3 space-y-4">
          <div className="flex flex-col space-y-2">{navLinks}</div>
          <form
            onSubmit={handleSearchSubmit}
            className="flex items-center border border-gray-700 rounded overflow-hidden"
          >
            <input
              type="text"
              placeholder="Search products & news..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-2 py-1 text-black outline-none"
            />
            <button
              type="submit"
              className="bg-amber-500 px-3 py-1 hover:bg-amber-600 transition-colors duration-300"
              aria-label="Search"
            >
              Search
            </button>
          </form>
          {cartItems.length > 0 && (
            <Link
              to="/cart"
              onClick={() => setIsMenuOpen(false)}
              className="relative inline-block hover:text-amber-400 transition-colors duration-300"
            >
              <FaShoppingCart className="text-2xl" />
              <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full px-1 text-xs">
                {cartItems.length}
              </span>
            </Link>
          )}
          <div className="flex flex-col space-y-2">{authLinks}</div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;