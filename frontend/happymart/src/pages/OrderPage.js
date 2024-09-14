import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('/orders');
        setOrders(response.data);
      } catch (error) {
        setError('Failed to fetch orders');
        console.error('Error fetching orders', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Orders</h1>
      <ul>
        {orders.map(order => (
          <li key={order.id}>
            <p>Order ID: {order.id}</p>
            <p>User ID: {order.userId}</p>
            <p>Total Amount: {order.totalAmount}</p>
            <p>Status: {order.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderPage;
