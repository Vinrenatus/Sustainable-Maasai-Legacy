import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const SearchResults = () => {
  const query = useQuery();
  const searchTerm = query.get('query') || '';
  const [products, setProducts] = useState([]);
  const [news, setNews] = useState([]);

  useEffect(() => {
    if (searchTerm) {
      axios.get('http://localhost:5000/api/product')
        .then(res => {
          const filteredProducts = res.data.products.filter(p =>
            p.name.toLowerCase().includes(searchTerm.toLowerCase())
          );
          setProducts(filteredProducts);
        })
        .catch(err => console.error(err));
      
      axios.get('http://localhost:5000/api/news')
        .then(res => {
          const filteredNews = res.data.news.filter(n =>
            n.title.toLowerCase().includes(searchTerm.toLowerCase())
          );
          setNews(filteredNews);
        })
        .catch(err => console.error(err));
    }
  }, [searchTerm]);

  return (
    <div className="max-w-7xl mx-auto p-8 bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent transition-all duration-300 hover:scale-105">
          Search Results for "{searchTerm}"
        </h1>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <section>
          <div className="bg-gray-800 shadow-md rounded-lg p-6 border border-gray-700 hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
              Products
            </h2>
            {products.length ? (
              <div className="space-y-4">
                {products.map(product => (
                  <div
                    key={product.id}
                    className="border p-4 rounded-lg transform transition duration-300 hover:scale-105 hover:shadow-xl hover:bg-gray-700"
                  >
                    <h3 className="text-xl font-semibold transition-colors duration-300 hover:text-amber-400">
                      {product.name}
                    </h3>
                    <p className="mt-2 text-gray-300 font-medium">
                      ${product.price}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400">No matching products found.</p>
            )}
          </div>
        </section>
        <section>
          <div className="bg-gray-800 shadow-md rounded-lg p-6 border border-gray-700 hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
              News
            </h2>
            {news.length ? (
              <div className="space-y-4">
                {news.map(n => (
                  <div
                    key={n.id}
                    className="border p-4 rounded-lg transform transition duration-300 hover:scale-105 hover:shadow-xl hover:bg-gray-700"
                  >
                    <h3 className="text-xl font-semibold transition-colors duration-300 hover:text-green-400">
                      {n.title}
                    </h3>
                    <p className="mt-2 text-gray-300">
                      {n.content}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400">No matching news found.</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default SearchResults;
