import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CartPage = () => {
  const [userId, setUserId] = useState('');
  const [cart, setCart] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCart = async () => {
      if (!userId) return;
      setLoading(true);
      try {
        const cartResponse = await axios.get(`/carts/${userId}`);
        setCart(cartResponse.data);

        const itemsResponse = await axios.get(`/carts/${cartResponse.data.id}/items`);
        setCartItems(itemsResponse.data);
      } catch (error) {
        setError('Failed to fetch cart');
        console.error('Error fetching cart', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [userId]);

  return (
    <div>
      <h1>Cart</h1>
      <input
        type="text"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        placeholder="Enter User ID"
      />
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
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CartPage;
