import React from 'react';
import { useNavigate } from 'react-router-dom';

const IndexPage = () => {
    const navigate = useNavigate();

    return (
        <div>
            <h1>HappyMarket</h1>
            <p>Choose an action:</p>
            <button onClick={() => navigate('/login')}>Go to Login</button>
            <button onClick={() => navigate('/register')}>Go to Register</button>
        </div>
    );
};

export default IndexPage;
