import React, { useEffect, useState } from 'react';
import axios from 'axios';


const AdminOrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [updatedOrder, setUpdatedOrder] = useState({ totalAmount: '', status: '' });

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
        setError('Failed to fetch orders');
        console.error('Error fetching orders', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

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
      await axios.put(`http://localhost:8080/orders/${id}`, {
        totalAmount: updatedOrder.totalAmount || undefined,
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

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Admin Orders Management</h1>
      <ul>
        {orders.map(order => (
          <li key={order.id} className="order-container">
            <div className="order-details">
              <p><strong>Order ID:</strong> {order.id}</p>
              <p><strong>Total Amount:</strong> ${order.totalAmount}</p>
              <p><strong>Status:</strong> {order.status}</p>
              <button onClick={() => handleDeleteOrder(order.id)}>Delete Order</button>
              <button onClick={() => { setSelectedOrder(order.id); setUpdatedOrder({ totalAmount: order.totalAmount, status: order.status }); }}>Update Order</button>
            </div>
            {selectedOrder === order.id && (
              <div className="update-order-form">
                <h4>Update Order</h4>
                <input
                  type="number"
                  name="totalAmount"
                  value={updatedOrder.totalAmount}
                  onChange={handleUpdateInputChange}
                  placeholder="Total Amount"
                />
                <input
                  type="text"
                  name="status"
                  value={updatedOrder.status}
                  onChange={handleUpdateInputChange}
                  placeholder="Status"
                />
                <button onClick={() => handleUpdateOrder(order.id)}>Submit Update</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminOrderPage;
