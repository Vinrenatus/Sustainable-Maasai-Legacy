import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import bonefire from '../assets/bonefire.jpeg'
import grouphoto1 from '../assets/grouphoto1.jpeg'
import adventure13 from '../assets/adventure13.jpg'
import skyselfie from '../assets/skyselfie.jpeg'
import adventure from '../assets/adventure.jpeg'
import adventure9 from '../assets/adventure9.jpg'
import adventure7 from '../assets/adventure7.jpg'
import groupphoto4 from '../assets/groupphoto4.jpeg'
import adventure10 from '../assets/adventure10.jpeg'




const images = [
  grouphoto1,
  adventure9,
  bonefire,
  adventure10,
  adventure,
  adventure13,
  adventure7
];

const Hero = () => {
  const [currentImage, setCurrentImage] = React.useState(0);
  const navigate = useNavigate();

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-[80vh] overflow-hidden">
      {/* Background Image Slider */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000 transform hover:scale-105 hover:brightness-110"
        style={{ backgroundImage: `url(${images[currentImage]})` }}
      >
        {/* Dark Overlay for Enhanced Readability */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>
      
      {/* Hero Content */}
      <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 uppercase tracking-wider bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
            Sustainable Maasai Legacy
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8">
            Discover handcrafted treasures that preserve culture and support sustainable artistry
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => navigate('/signup')}
              className="bg-gradient-to-r from-amber-500 to-amber-400 text-black px-8 py-3 rounded-full shadow-lg transition-all duration-500 transform hover:scale-105 hover:from-amber-600 hover:to-amber-500"
            >
              Join Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
