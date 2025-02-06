import React from 'react';
import { useCart } from '../context/CartContext';
import axios from 'axios';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleCheckout = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/checkout', {
        items: cartItems,
        total: totalPrice,
      });
      const { redirectUrl } = response.data;
      window.location.href = redirectUrl;
    } catch (error) {
      console.error('Checkout error:', error);
      alert('An error occurred during checkout. Please try again.');
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto p-8">
        <h2 className="text-2xl font-bold mb-4">Your Cart is Empty</h2>
        <p>Add some products to the cart to see them here.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-8">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      <ul className="space-y-4">
        {cartItems.map((item) => (
          <li key={item.id} className="flex items-center justify-between border p-4 rounded-md">
            <div>
              <h3 className="font-bold">{item.name}</h3>
              <p>${item.price} x {item.quantity}</p>
              <div className="flex space-x-2 mt-2">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                  className="bg-gray-300 px-2 rounded"
                >
                  –
                </button>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="bg-gray-300 px-2 rounded"
                >
                  +
                </button>
              </div>
            </div>
            <button onClick={() => removeFromCart(item.id)} className="bg-red-600 text-white px-3 py-1 rounded-md">
              Remove
            </button>
          </li>
        ))}
      </ul>
      <div className="mt-6 flex items-center justify-between">
        <p className="text-xl font-bold">Total: ${totalPrice.toFixed(2)}</p>
        <button onClick={handleCheckout} className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-colors">
          Checkout
        </button>
      </div>
      <div className="mt-4">
        <button onClick={clearCart} className="text-red-600 underline">Clear Cart</button>
      </div>
    </div>
  );
};

export default Cart;
