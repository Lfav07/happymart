import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './css/OrderPage.css';

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [orderItems, setOrderItems] = useState({});
  const navigate = useNavigate();
  const [userId, setUserId] = useState(localStorage.getItem('userId'));

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('jwt');
        const response = await axios.get(`http://localhost:8080/orders/${userId}/orders`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrders(response.data);
      } catch (error) {
        setError('Failed to fetch orders');
        console.error('Error fetching orders', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userId]);

  const fetchOrderItems = async (orderId) => {
    try {
      const token = localStorage.getItem('jwt');
      const response = await axios.get(`http://localhost:8080/orders/${orderId}/items`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOrderItems((prevOrderItems) => ({
        ...prevOrderItems,
        [orderId]: response.data,
      }));
    } catch (error) {
      console.error('Error fetching order items', error);
    }
  };

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Orders</h1>
      <ul>
        {orders.map(order => (
          <li key={order.id} className="order-container">
            <div className="order-details">
              <p><strong>Order ID:</strong> {order.id}</p>
              <p><strong>Total Amount:</strong> ${order.totalAmount}</p>
              <p><strong>Status:</strong> {order.status}</p>
              <button
                className="view-products-button"
                onClick={() => fetchOrderItems(order.id)}
              >
                View Products
              </button>
            </div>
            {orderItems[order.id] && (
              <div className="order-items">
                <h4>Products in this Order:</h4>
                <ul>
                  {orderItems[order.id].map(item => (
                    <li key={item.id} className="order-item">
                      <p><strong>Product Name:</strong> {item.product.name}</p>
                      <p><strong>Quantity:</strong> {item.quantity}</p>
                      <p><strong>Price:</strong> ${item.price}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        ))}
      </ul>
      <button className="home-button" onClick={() => navigate('/home')}>Home</button>
    </div>
  );
};

export default OrderPage;
