import React from 'react';
import { Facebook, Twitter, Instagram, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="relative py-12 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
      {/* Decorative Background SVG */}
      <div className="absolute inset-0 z-0 opacity-20">
        <svg className="w-full h-full" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="footerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFC107" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#FF5722" stopOpacity="0.3" />
            </linearGradient>
          </defs>
          <rect width="800" height="600" fill="url(#footerGradient)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About Us */}
        <div>
          <h3 className="text-lg font-semibold mb-4 bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
            About Us
          </h3>
          <p 
            className="text-gray-300" 
            style={{ textAlign: 'justify' }}
          >
            Sustainable Maasai Legacy preserves and celebrates Maasai culture through authentic, ethically crafted products.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4 bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
            Quick Links
          </h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="text-gray-300 hover:text-white transition-colors duration-300">
                Home
              </Link>
            </li>
            <li>
              <Link to="/store" className="text-gray-300 hover:text-white transition-colors duration-300">
                Shop
              </Link>
            </li>
            <li>
              <Link to="/story" className="text-gray-300 hover:text-white transition-colors duration-300">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-gray-300 hover:text-white transition-colors duration-300">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Connect With Us */}
        <div>
          <h3 className="text-lg font-semibold mb-4 bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
            Connect With Us
          </h3>
          <div className="flex space-x-4 mb-4">
            <a
              href="#"
              className="text-gray-300 hover:text-white transform hover:scale-110 transition-transform duration-300"
            >
              <Facebook size={24} />
            </a>
            <a
              href="#"
              className="text-gray-300 hover:text-white transform hover:scale-110 transition-transform duration-300"
            >
              <Twitter size={24} />
            </a>
            <a
              href="#"
              className="text-gray-300 hover:text-white transform hover:scale-110 transition-transform duration-300"
            >
              <Instagram size={24} />
            </a>
          </div>
          <div className="mt-4">
            <h4 className="text-sm font-semibold mb-2 bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
              Subscribe to our newsletter
            </h4>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-gray-700 text-white px-4 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all duration-300"
              />
              <button className="bg-gradient-to-r from-amber-500 to-amber-400 px-4 py-2 rounded-r-md hover:from-amber-600 hover:to-amber-500 transition-all duration-300 shadow-lg">
                <Mail size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 mt-8 pt-8 border-t border-gray-700">
        <div className="text-center text-gray-400 text-sm">
          <p>&copy; 2024 Sustainable Maasai Legacy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
