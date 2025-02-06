import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const images = [
  'https://images.pexels.com/photos/13033128/pexels-photo-13033128.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/667200/pexels-photo-667200.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/2343011/pexels-photo-2343011.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'https://images.pexels.com/photos/8628442/pexels-photo-8628442.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'https://images.pexels.com/photos/28571474/pexels-photo-28571474/free-photo-of-leopard-climbing-a-tree-at-sunset-in-maasai-mara.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'https://images.pexels.com/photos/13033075/pexels-photo-13033075.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/4314682/pexels-photo-4314682.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://www.shutterstock.com/shutterstock/photos/2360659795/display_1500/stock-photo-olare-motorogi-conservancy-kenya-march-interior-of-a-luxury-lodge-2360659795.jpg',
  'https://www.shutterstock.com/shutterstock/photos/320420561/display_1500/stock-photo-masai-mara-kenya-january-the-picture-painted-colors-maasai-obstraktsiya-in-the-gift-shop-for-320420561.jpg'
];

const Hero = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-[80vh]">
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
        style={{ backgroundImage: `url(${images[currentImage]})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>
      <div className="relative h-full flex items-center justify-center text-center px-4">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Authentic Maasai Craftsmanship
          </h1>
          <p className="text-xl text-white mb-8">
            Discover handcrafted treasures that preserve culture and support sustainable artistry
          </p>

          {/* Sign-up or Login Message with Red Background */}
          <div className="mb-6 text-white bg-red-600 p-4 rounded-md">
            <p className="text-lg font-semibold">
              Sign up or log in to enable purchases and explore more!
            </p>
          </div>

          <button
            onClick={() => navigate('/signup')}
            className="bg-stone-800 text-white px-8 py-3 rounded-md hover:bg-stone-700 transition-colors"
          >
            Join Us
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
