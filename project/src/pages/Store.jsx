import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCart } from '../context/CartContext';

const Store = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    axios.get('http://localhost:5000/api/product')
      .then(response => setProducts(response.data.products))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Store</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map(product => (
          <div key={product.id} className="border p-4 rounded-lg bg-white shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-xl">
            <img src={product.image_url} alt={product.name} className="w-full h-48 object-cover mb-4 rounded-lg" />
            <h2 className="text-xl font-bold text-indigo-800">{product.name}</h2>
            <p className="text-gray-700">${product.price}</p>
            <p className="mt-2 text-gray-600 text-justify">{product.description}</p>
            <button onClick={() => addToCart(product)} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Store;
