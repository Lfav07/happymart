import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminCartPage = () => {
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
      setError('Failed to fetch cart items');
      console.error('Error fetching cart items', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCartItem = async () => {
    if (!newCartItem.productId || !newCartItem.quantity) {
      alert('Please fill in all fields.');
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
      alert('Cart item added successfully!');
    } catch (error) {
      console.error('Error adding cart item:', error);
      setError('Failed to add cart item');
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
      alert('Cart item removed successfully!');
    } catch (error) {
      console.error('Error removing cart item:', error);
      setError('Failed to remove cart item');
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
      alert('Cart cleared successfully!');
    } catch (error) {
      console.error('Error clearing cart:', error);
      setError('Failed to clear cart');
    }
  };

  return (
    <div>
      <h1>Admin Cart Management</h1>
      <input
        type="text"
        placeholder="User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <button onClick={fetchCartItems}>Fetch Cart Items</button>
      <button onClick={() => navigate('/admin/home')}>Home</button>

      {loading && <p>Loading cart items...</p>}
      {error && <p>{error}</p>}

      {cartItems.length > 0 ? (
        <div>
          <h2>Cart Items</h2>
          <ul>
            {cartItems.map(item => (
              <li key={item.id}>
                Product ID: {item.product.id}, Quantity: {item.quantity}, Price: ${item.price.toFixed(2)}
                <button onClick={() => handleRemoveCartItem(item.id)}>Remove</button>
              </li>
            ))}
          </ul>
          <h3>Total Amount: ${cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}</h3>
          <button onClick={handleClearCart}>Clear Cart</button>

          <h3>Add New Cart Item</h3>
          <input
            type="text"
            placeholder="Product ID"
            value={newCartItem.productId}
            onChange={(e) => setNewCartItem({ ...newCartItem, productId: e.target.value })}
          />
          <input
            type="number"
            placeholder="Quantity"
            value={newCartItem.quantity}
            onChange={(e) => setNewCartItem({ ...newCartItem, quantity: e.target.value })}
          />
          <button onClick={handleAddCartItem}>Add Cart Item</button>
        </div>
      ) : (
        <p>No items in cart.</p>
      )}
    </div>
  );
};

export default AdminCartPage;
