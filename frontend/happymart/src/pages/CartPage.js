import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useUser } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './css/CartPage.css';

const CartPage = () => {
  const { user } = useUser();
  const { t } = useTranslation();
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
        setError(t('error', { error: 'Failed to fetch cart items' }));
        console.error('Error fetching cart items', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, [userId, t]);

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
      setError(t('error', { error: 'Failed to remove item' }));
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
      alert(t('order_success'));
      navigate('/orders');
    } catch (error) {
      setError(t('order_fail'));
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
      setError(t('error', { error: 'Failed to clear cart' }));
    }
  };

  return (
    <div className="CartPage">
      <h1>{t('cart_title')}</h1>
      {loading && <p>{t('loading_cart')}</p>}
      {error && <p>{error}</p>}
      {cartItems.length > 0 ? (
        <div>
          <h2>{t('your_cart_items')}</h2>
          <ul>
            {cartItems.map(item => (
              <li key={item.id}>
                <div className="item-details">
                  <strong>{t('product_name')}</strong> {item.product.name}
                </div>
                <div className="item-details">
                  <strong>{t('quantity')}</strong> {item.quantity}
                </div>
                <div className="item-details">
                  <strong>{t('price')}</strong> ${item.price.toFixed(2)}
                </div>
                <button onClick={() => handleRemoveItem(item.id)}>{t('remove_button')}</button>
              </li>
            ))}
          </ul>

          <h3 className="total-amount">{t('total_amount')} ${calculateTotalAmount().toFixed(2)}</h3>
          <button onClick={handleCheckout}>{t('checkout_button')}</button>
          <button onClick={handleClearCart}>{t('clear_cart_button')}</button>
        </div>
      ) : (
        <p>{t('cart_empty')}</p>
      )}
      <button onClick={() => navigate('/home')}>{t('home_button')}</button>
    </div>
  );
};

export default CartPage;
