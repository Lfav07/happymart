import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './css/OrderPage.css';

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [orderItems, setOrderItems] = useState({});
  const navigate = useNavigate();
  const { t } = useTranslation();
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
        setError(t('fetch_orders_error'));
        console.error('Error fetching orders', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userId, t]);

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

  if (loading) return <p>{t('loading_orders')}</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>{t('orders_title')}</h1>
      <ul>
        {orders.map(order => (
          <li key={order.id} className="order-container">
            <div className="order-details">
              <p><strong>{t('order_id')}</strong> {order.id}</p>
              <p><strong>{t('total_amount')}</strong> ${order.totalAmount}</p>
              <p><strong>{t('status')}</strong> {order.status}</p>
              <button
                className="view-products-button"
                onClick={() => fetchOrderItems(order.id)}
              >
                {t('view_products_button')}
              </button>
            </div>
            {orderItems[order.id] && (
              <div className="order-items">
                <h4>{t('products_in_order')}</h4>
                <ul>
                  {orderItems[order.id].map(item => (
                    <li key={item.id} className="order-item">
                      <p><strong>{t('product_name')}</strong> {item.product.name}</p>
                      <p><strong>{t('quantity')}</strong> {item.quantity}</p>
                      <p><strong>{t('price')}</strong> ${item.price}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        ))}
      </ul>
      <button className="home-button" onClick={() => navigate('/home')}>{t('home_button')}</button>
    </div>
  );
};

export default OrderPage;
