import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const AdminOrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [updatedOrder, setUpdatedOrder] = useState({ totalAmount: '', status: '' });
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('jwt');
        const response = await axios.get('http://localhost:8080/orders', {
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
  }, [t]);

  const handleDeleteOrder = async (id) => {
    try {
      const token = localStorage.getItem('jwt');
      await axios.delete(`http://localhost:8080/orders/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOrders(orders.filter(order => order.id !== id));
    } catch (error) {
      console.error('Error deleting order', error);
    }
  };

  const handleUpdateOrder = async (id) => {
    try {
      const token = localStorage.getItem('jwt');
      await axios.patch(`http://localhost:8080/orders/${id}/status`, {
        status: updatedOrder.status || undefined,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrders(orders.map(order => (order.id === id ? { ...order, ...updatedOrder } : order)));
      setSelectedOrder(null);
      setUpdatedOrder({ totalAmount: '', status: '' });
    } catch (error) {
      console.error('Error updating order', error);
    }
  };

  const handleUpdateInputChange = (e) => {
    setUpdatedOrder({ ...updatedOrder, [e.target.name]: e.target.value });
  };

  if (loading) return <p>{t('loading_orders')}</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>{t('admin_orders_management')}</h1> {}
      <ul>
        {orders.map(order => (
          <li key={order.id} className="order-container">
            <div className="order-details">
              <p><strong>{t('order_id')}:</strong> {order.id}</p> {}
              <p><strong>{t('total_amount')}:</strong> ${order.totalAmount}</p> {}
              <p><strong>{t('status')}:</strong> {order.status}</p> {}
              <button onClick={() => handleDeleteOrder(order.id)}>{t('delete_order')}</button> {}
              <button onClick={() => {
                setSelectedOrder(order.id);
                setUpdatedOrder({ totalAmount: order.totalAmount, status: order.status });
              }}>
                {t('update_order')} {}
              </button>
            </div>
            {selectedOrder === order.id && (
              <div className="update-order-form">
                <h4>{t('update_order')}</h4> {}

                <select
                  name="status"
                  value={updatedOrder.status}
                  onChange={handleUpdateInputChange}
                >
                  <option value="">{t('select_status')}</option> {}
                  <option value="PENDING">{t('pending_status')}</option> {}
                  <option value="COMPLETED">{t('completed_status')}</option> {}
                  <option value="CANCELLED">{t('cancelled_status')}</option> { }
                </select>
                <button onClick={() => handleUpdateOrder(order.id)}>{t('submit_update')}</button> {}
              </div>
            )}
          </li>
        ))}
      </ul>
      <button onClick={() => navigate('/admin/home')}>{t('home_button')}</button> {/* Translation for Home button */}
    </div>
  );
};

export default AdminOrderPage;
