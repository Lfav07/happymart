import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const navigate = useNavigate();
    const currentUsername = localStorage.getItem('username');

    return (
        <div>
            <h1>HappyMarket</h1>
            <h2>Welcome, {currentUsername ? currentUsername : 'Guest'}!</h2>
            <p>Choose an action:</p>
            <button onClick={() => navigate('/products')}>Go to products catalog</button>
            <button onClick={() => navigate('/admin/products')}>Manage products</button>
            <button onClick={() => navigate('/userslist')}>Manage users </button>
            <button onClick={() => navigate('/logout')}>Log out</button>
        </div>
    );
};

export default HomePage;
