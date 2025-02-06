import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NewsPage = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/news')
      .then(response => setNews(response.data.news))
      .catch(error => console.error('Error fetching news:', error));
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-8">
      <h1 className="text-4xl font-extrabold text-center mb-12 text-indigo-600">Latest News</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {news.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl">
            <img 
              src={item.image_url} 
              alt={item.title} 
              className="w-full h-48 sm:h-56 lg:h-64 object-cover object-center" 
            />
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-indigo-800 mb-4">{item.title}</h2>
              <p className="text-base text-gray-700 leading-relaxed text-justify">{item.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsPage;
