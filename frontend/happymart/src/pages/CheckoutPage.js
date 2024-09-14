import React, { useState } from 'react';
import axios from 'axios';

const CheckoutPage = () => {
  const [cartId, setCartId] = useState('');
  const [order, setOrder] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`/checkout/${cartId}`);
      setOrder(response.data);
    } catch (error) {
      setError('Checkout failed');
      console.error('Error during checkout', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Checkout</h1>
      <input
        type="text"
        value={cartId}
        onChange={(e) => setCartId(e.target.value)}
        placeholder="Enter Cart ID"
      />
      <button onClick={handleCheckout} disabled={loading}>
        {loading ? 'Processing...' : 'Checkout'}
      </button>
      {order && (
        <div>
          <h2>Order Confirmation</h2>
          <p>Order ID: {order.id}</p>
          <p>Total Amount: {order.totalAmount}</p>
        </div>
      )}
      {error && <p>{error}</p>}
    </div>
  );
};

export default CheckoutPage;
