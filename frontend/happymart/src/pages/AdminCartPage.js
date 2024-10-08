import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './css/AdminCartPage.css';

const AdminCartPage = () => {
  const { t } = useTranslation();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [newCartItem, setNewCartItem] = useState({ productId: '', quantity: '' });
  const [userId, setUserId] = useState('');
  const navigate = useNavigate();

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
      setError(t('failedToFetchCartItems'));
      console.error('Error fetching cart items', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCartItem = async () => {
    if (!newCartItem.productId || !newCartItem.quantity) {
      alert(t('pleaseFillInAllFields'));
      return;
    }

    try {
      const token = localStorage.getItem('jwt');
      const response = await axios.post(
        `http://localhost:8080/users/${userId}/cart/items`,
        { productId: newCartItem.productId, quantity: newCartItem.quantity },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      setCartItems([...cartItems, response.data]);
      setNewCartItem({ productId: '', quantity: '' });
      alert(t('cartItemAddedSuccessfully'));
    } catch (error) {
      console.error('Error adding cart item:', error);
      setError(t('failedToAddCartItem'));
    }
  };

  const handleRemoveCartItem = async (itemId) => {
    try {
      const token = localStorage.getItem('jwt');
      await axios.delete(`http://localhost:8080/users/${userId}/cart/items/${itemId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCartItems(cartItems.filter(item => item.id !== itemId));
      alert(t('cartItemRemovedSuccessfully'));
    } catch (error) {
      console.error('Error removing cart item:', error);
      setError(t('failedToRemoveCartItem'));
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
      alert(t('cartClearedSuccessfully'));
    } catch (error) {
      console.error('Error clearing cart:', error);
      setError(t('failedToClearCart'));
    }
  };

  return (
    <div className="AdminCartPage">
      <h1>{t('adminCartManagement')}</h1>
      <input
        type="text"
        placeholder={t('userId')}
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <button onClick={fetchCartItems}>{t('fetchCartItems')}</button>
      <button onClick={() => navigate('/admin/home')}>{t('home')}</button>

      {loading && <p>{t('loadingCartItems')}</p>}
      {error && <p>{error}</p>}

      {cartItems.length > 0 ? (
        <div>
          <h2>{t('cartItems')}</h2>
          <ul>
            {cartItems.map(item => (
              <li key={item.id}>
                <strong>{t('productId')}:</strong> {item.product.id}  ,
                <strong> {  t('quantity')}:</strong> {item.quantity }  ,
                <strong> {t('price')}:</strong> ${item.price.toFixed(2)}
                <button onClick={() => handleRemoveCartItem(item.id)}>{t('remove')}</button>
              </li>
            ))}
          </ul>
          <h3 className="total-amount">{t('totalAmount')}: ${cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}</h3>
          <button onClick={handleClearCart}>{t('clearCart')}</button>

          <h3>{t('addNewCartItem')}</h3>
          <input
            type="text"
            placeholder={t('productId')}
            value={newCartItem.productId}
            onChange={(e) => setNewCartItem({ ...newCartItem,  productId: e.target.value })}
          />
          <input
            type="number"
            placeholder={t('quantity')}
            value={newCartItem.quantity}
            onChange={(e) => setNewCartItem({ ...newCartItem, quantity: e.target.value })}
          />
          <button onClick={handleAddCartItem}>{t('addCartItem')}</button>
        </div>
      ) : (
        <p>{t('noItemsInCart')}</p>
      )}
    </div>
  );
};

export default AdminCartPage;
