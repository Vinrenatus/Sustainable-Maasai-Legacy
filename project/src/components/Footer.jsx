import React from 'react';
import { Facebook, Twitter, Instagram, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-stone-800 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-lg font-semibold mb-4">About Us</h3>
          <p className="text-stone-300">
            Sustainable Maasai Legacy preserves and celebrates Maasai culture through authentic, 
            ethically crafted products.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link to="/" className="text-stone-300 hover:text-white">Home</Link></li>
            <li><Link to="/store" className="text-stone-300 hover:text-white">Shop</Link></li>
            <li><Link to="/story" className="text-stone-300 hover:text-white">About</Link></li>
            <li><Link to="/contact" className="text-stone-300 hover:text-white">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
          <div className="flex space-x-4 mb-4">
            <a href="#" className="text-stone-300 hover:text-white">
              <Facebook size={24} />
            </a>
            <a href="#" className="text-stone-300 hover:text-white">
              <Twitter size={24} />
            </a>
            <a href="#" className="text-stone-300 hover:text-white">
              <Instagram size={24} />
            </a>
          </div>
          <div className="mt-4">
            <h4 className="text-sm font-semibold mb-2">Subscribe to our newsletter</h4>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-stone-700 text-white px-4 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-stone-500"
              />
              <button className="bg-stone-600 px-4 py-2 rounded-r-md hover:bg-stone-500">
                <Mail size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 mt-8 pt-8 border-t border-stone-700">
        <div className="text-center text-stone-400 text-sm">
          <p>&copy; 2024 Sustainable Maasai Legacy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
