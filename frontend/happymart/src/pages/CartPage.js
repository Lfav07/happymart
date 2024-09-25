import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useUser } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';


const CartPage = () => {
  const { user } = useUser();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [userId, setUserId] = useState(localStorage.getItem('userId')); // Align with CompleteProductList
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartItems = async () => {
      if (!userId) return;

      setLoading(true);
      try {
        const token = localStorage.getItem('jwt');
        const response = await axios.get(`http://localhost:8080/users/${userId}/cart/items`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCartItems(response.data);
      } catch (error) {
        setError('Failed to fetch cart items');
        console.error('Error fetching cart items', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, [userId]);

  const handleRemoveItem = async (itemId) => {
    try {
      await axios.delete(`http://localhost:8080/users/${userId}/cart/items/${itemId}`);
      setCartItems(cartItems.filter(item => item.id !== itemId));
    } catch (error) {
      setError('Failed to remove item');
    }
  };

  const handleClearCart = async () => {
    try {
     const token = localStorage.getItem('jwt');
            const response = await axios.delete(`http://localhost:8080/users/${userId}/cart/items`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
    } catch (error) {
      setError('Failed to clear cart');
    }
 navigate(0) };

  return (
    <div className="CartPage">
      <h1>Cart</h1>
      {loading && <p>Loading cart items...</p>}
      {error && <p>{error}</p>}
      {cartItems.length > 0 ? (
        <div>
          <h2>Your Cart Items</h2>
          <ul>
            {cartItems.map(item => (
              <li key={item.id}>
                <strong>Product Name:</strong> {item.product.name} <br />
                <strong>Quantity:</strong> {item.quantity} <br />
                <strong>Price:</strong> ${item.price.toFixed(2)} <br />
                <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
              </li>
            ))}
          </ul>
          <button onClick={handleClearCart}>Clear Cart</button>
        </div>
      ) : (
        <p>Your cart is empty.</p>
      )}
      <button onClick={() => navigate('/home')}>Home</button>
    </div>
  );
};

export default CartPage;
