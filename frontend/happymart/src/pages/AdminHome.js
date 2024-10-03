import React from 'react';
import { useNavigate } from 'react-router-dom';
import './css/AdminHome.css';

const AdminHome = () => {
    const navigate = useNavigate();
    const currentUsername = localStorage.getItem('username');

    return (
        <div className="admin-home-container">
            <h1>HappyMarket</h1>
            <h2>Welcome, Administrator!</h2>
            <p>Choose an action:</p>
            <button onClick={() => navigate('/admin/products')}>Manage products</button>
            <button onClick={() => navigate('/admin/carts')}>Manage Carts</button>
            <button onClick={() => navigate('/admin/users')}>Manage users</button>
             <button onClick={() => navigate('/admin/orders')}>Manage orders</button>
            <button onClick={() => navigate('/admin/logout')}>Log out</button>
        </div>

    );
};

export default AdminHome;
