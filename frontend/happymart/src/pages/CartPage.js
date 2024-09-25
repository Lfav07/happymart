import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useUser } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const { user } = useUser();
  const [cart, setCart] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      if (!user.id) return;

      setLoading(true);
      try {
        // Fetch or create cart for the user
        const cartResponse = await axios.get(`/users/${user.id}/cart`);
        setCart(cartResponse.data);

        // Fetch all cart items for the user's cart
        const itemsResponse = await axios.get(`/users/${user.id}/cart/items`);
        setCartItems(itemsResponse.data);
      } catch (error) {
        setError('Failed to fetch cart');
        console.error('Error fetching cart', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [user.id]);

  const handleRemoveItem = async (itemId) => {
    try {
      await axios.delete(`/users/${user.id}/cart/items/${itemId}`);
      setCartItems(cartItems.filter(item => item.id !== itemId));
    } catch (error) {
      setError('Failed to remove item');
    }
  };

  const handleClearCart = async () => {
    try {
      await axios.delete(`/users/${user.id}/cart/items`);
      setCartItems([]);
    } catch (error) {
      setError('Failed to clear cart');
    }
  };

  return (
    <div>
      <h1>Cart</h1>
      {loading && <p>Loading cart...</p>}
      {error && <p>{error}</p>}
      {cart && (
        <div>
          <h2>Cart ID: {cart.id}</h2>
          <h3>Total Price: {cart.totalPrice}</h3>
          <ul>
            {cartItems.map(item => (
              <li key={item.id}>
                <p>Product ID: {item.product.id}</p>
                <p>Product Name: {item.product.name}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Price: {item.price}</p>
                <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
              </li>
            ))}
          </ul>
        </div>
      )}
      <button onClick={handleClearCart}>Clear Cart</button>
      <button onClick={() => navigate('/home')}>Home</button>
    </div>
  );
};

export default CartPage;
