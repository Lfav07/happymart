import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminHome = () => {
    const navigate = useNavigate();
    const currentUsername = localStorage.getItem('username');

    return (
        <div>
            <h1>HappyMarket</h1>
            <h2>Welcome, Administrator {currentUsername ? currentUsername : 'Guest'}!</h2>
            <p>Choose an action:</p>
            <button onClick={() => navigate('/products')}>Go to products catalog</button>
            <button onClick={() => navigate('/admin/AdminProductsPage')}>Manage products</button>
            <button onClick={() => navigate('/admin/userslist')}>Manage users </button>
            <button onClick={() => navigate('/admin/logout')}>Log out</button>
        </div>
    );
};

export default AdminHome;
