import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useUser } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import './css/CartPage.css';

const CartPage = () => {
  const { user } = useUser();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [userId, setUserId] = useState(localStorage.getItem('userId'));
  const navigate = useNavigate();

  const calculateTotalAmount = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

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
      const token = localStorage.getItem('jwt');


      await axios.delete(`http://localhost:8080/users/${userId}/cart/items/${itemId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });


      setCartItems(cartItems.filter(item => item.id !== itemId));
    } catch (error) {
      setError('Failed to remove item');
    }
  };



  const handleCheckout = async () => {
    try {
      const token = localStorage.getItem('jwt');
      const totalAmount = cartItems.reduce((total, item) => total + item.price, 0);

      const orderResponse = await axios.post(
        `http://localhost:8080/orders`,
        {
          userId: userId,
          totalAmount: totalAmount,
          status: 'PENDING'
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const orderId = orderResponse.data.id;

      for (const cartItem of cartItems) {
        await axios.post(
          `http://localhost:8080/orders/${orderId}/items`,
          {
            product: { id: cartItem.product.id },
            quantity: cartItem.quantity,
            price: cartItem.price
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );
      }

      await handleClearCart();
      alert('Order placed successfully!');
      navigate('/orders');
    } catch (error) {
      setError('Failed to place the order');
      console.error('Error placing order:', error);
    }
  };

  const handleClearCart = async () => {
    try {
      const token = localStorage.getItem('jwt');
      await axios.delete(`http://localhost:8080/users/${userId}/cart/items`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCartItems([]);
    } catch (error) {
      setError('Failed to clear cart');
    }
  };

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
                <div className="item-details">
                  <strong>Product Name:</strong> {item.product.name}
                </div>
                <div className="item-details">
                  <strong>Quantity:</strong> {item.quantity}
                </div>
                <div className="item-details">
                  <strong>Price:</strong> ${item.price.toFixed(2)}
                </div>
                <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
              </li>
            ))}
          </ul>

          <h3 className="total-amount">Total Amount: ${calculateTotalAmount().toFixed(2)}</h3>
          <button onClick={handleCheckout}>Checkout</button>
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
