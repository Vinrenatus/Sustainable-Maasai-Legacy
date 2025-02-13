import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NewsPage = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/news')
      .then(response => setNews(response.data.news))
      .catch(error => console.error('Error fetching news:', error));
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-8 bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen">
      <h1 className="text-4xl font-extrabold text-center mb-12 bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent transition-all duration-300 hover:scale-105">
        Latest News
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {news.map((item) => (
          <div
            key={item.id}
            className="bg-gray-800 border border-gray-700 rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <img 
              src={item.image_url} 
              alt={item.title} 
              className="w-full h-48 sm:h-56 lg:h-64 object-cover object-center transition-transform duration-300 hover:scale-105" 
            />
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                {item.title}
              </h2>
              <p className="text-base text-gray-300 leading-relaxed text-justify">
                {item.content}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsPage;
