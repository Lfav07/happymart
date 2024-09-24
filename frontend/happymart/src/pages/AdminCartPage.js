import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminCartPage = () => {
const navigate = useNavigate();
  const [userId, setUserId] = useState('');
  const [cart, setCart] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [newCartItem, setNewCartItem] = useState({ productId: '', quantity: '' });

  const fetchCart = async () => {
    try {
      const response = await axios.get(`/carts/${userId}`);
      setCart(response.data);
      if (response.data) {
        fetchCartItems(response.data.id);
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  const fetchCartItems = async (cartId) => {
    try {
      const response = await axios.get(`/carts/${cartId}/items`);
      setCartItems(response.data);
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  const handleCreateCart = async () => {
    try {
      const response = await axios.post(`/carts/create?userId=${userId}`);
      setCart(response.data);
      alert('Cart created successfully!');
    } catch (error) {
      console.error('Error creating cart:', error);
    }
  };

  const handleAddCartItem = async () => {
      if (!cart) {
          alert('No cart available. Please create a cart first.');
          return;
      }

      if (!newCartItem.productId || !newCartItem.quantity) {
          alert('Please fill in all fields.');
          return;
      }

      console.log('Adding cart item:', newCartItem);
      try {
          const response = await axios.post(`/carts/${cart.id}/items`, null, {
              params: {
                  productId: newCartItem.productId,
                  quantity: newCartItem.quantity,
              },
          });
          setCartItems([...cartItems, response.data]);
          setNewCartItem({ productId: '', quantity: '' });
          alert('Cart item added successfully!');
      } catch (error) {
          console.error('Error adding cart item:', error.response ? error.response.data : error.message);
      }
  };


  const handleUpdateCartItem = async (cartItemId) => {
    const newQuantity = prompt('Enter new quantity:');
    if (!newQuantity) return;

    try {
      const response = await axios.put(`/carts/items/${cartItemId}`, null, {
        params: { newQuantity },
      });
      setCartItems(cartItems.map(item => (item.id === cartItemId ? response.data : item)));
      alert('Cart item updated successfully!');
    } catch (error) {
      console.error('Error updating cart item:', error);
    }
  };

  const handleRemoveCartItem = async (cartItemId) => {
    if (!cart) return;

    try {
      await axios.delete(`/carts/${cart.id}/items/${cartItemId}`);
      setCartItems(cartItems.filter(item => item.id !== cartItemId));
      alert('Cart item removed successfully!');
    } catch (error) {
      console.error('Error removing cart item:', error);
    }
  };

  const handleClearCart = async () => {
    if (!cart) return;

    try {
      await axios.delete(`/carts/${cart.id}`);
      setCartItems([]);
      alert('Cart cleared successfully!');
    } catch (error) {
      console.error('Error clearing cart:', error);
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
      <button onClick={fetchCart}>Fetch Cart</button>
      <button onClick={handleCreateCart}>Create Cart</button>
       <button onClick={() => navigate('/admin/home')}>Home</button>

      {cart && (
        <div>
          <h2>Cart ID: {cart.id}</h2>
          <h3>Cart Items</h3>
          <ul>
            {cartItems.map(item => (
              <li key={item.id}>
                Product ID: {item.productId}, Quantity: {item.quantity}
                <button onClick={() => handleUpdateCartItem(item.id)}>Update</button>
                <button onClick={() => handleRemoveCartItem(item.id)}>Remove</button>
              </li>
            ))}
          </ul>
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
          <button onClick={handleClearCart}>Clear Cart</button>

        </div>
      )}
    </div>
  );
};

export default AdminCartPage;
