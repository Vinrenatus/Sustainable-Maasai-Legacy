import React from 'react';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();
  return (
    <section className="py-16 px-4 bg-stone-100">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <img
              src="https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2912&q=80"
              alt="Maasai artisans"
              className="rounded-lg shadow-lg"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-6 text-stone-800">
              Our Heritage, Our Future
            </h2>
            <p className="text-stone-600 mb-6">
              Sustainable Maasai Legacy is more than just a marketplace—it's a bridge between 
              centuries-old traditions and contemporary appreciation for artisanal craftsmanship. 
              Every piece in our collection tells a story of cultural preservation and sustainable practices.
            </p>
            <p className="text-stone-600 mb-8">
              By supporting our artisans, you're not just acquiring a beautiful piece of art; 
              you're participating in the continuation of Maasai cultural heritage and supporting 
              sustainable livelihoods in local communities.
            </p>
            <button 
              onClick={() => navigate('/become-warrior')}
              className="bg-stone-800 text-white px-8 py-3 rounded-md hover:bg-stone-700 transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
