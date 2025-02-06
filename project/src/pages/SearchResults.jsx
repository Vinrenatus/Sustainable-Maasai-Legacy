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
    <div className="max-w-7xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Search Results for "{searchTerm}"</h1>
      <section>
        <h2 className="text-2xl font-bold mb-4">Products</h2>
        {products.length ? (
          <ul>
            {products.map(product => (
              <li key={product.id}>
                <h3 className="font-semibold">{product.name}</h3>
                <p>${product.price}</p>
              </li>
            ))}
          </ul>
        ) : <p>No matching products found.</p>}
      </section>
      <section className="mt-8">
        <h2 className="text-2xl font-bold mb-4">News</h2>
        {news.length ? (
          <ul>
            {news.map(n => (
              <li key={n.id}>
                <h3 className="font-semibold">{n.title}</h3>
                <p>{n.content}</p>
              </li>
            ))}
          </ul>
        ) : <p>No matching news found.</p>}
      </section>
    </div>
  );
};

export default SearchResults;
